/**
 * NCU Course Data Fetcher
 * Fetches latest course data directly from NCU Course Schedule Planning System (CIS).
 *
 * Data source:
 * - Colleges & Departments: https://cis.ncu.edu.tw/Course/main/query/byUnion
 * - Course bases: https://cis.ncu.edu.tw/Course/main/support/course.xml?id={deptId}
 * - Course types (Required/Elective): https://cis.ncu.edu.tw/Course/main/query/byKeywords
 */

/* eslint-disable no-console, no-await-in-loop, no-continue, no-cond-assign, no-nested-ternary, max-len, prefer-destructuring, no-constant-condition, no-param-reassign */

const fs = require('fs');
const path = require('path');

const COURSE_HEADER = {
  'Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchText(url) {
  const res = await fetch(url, { headers: COURSE_HEADER });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res.text();
}

function decodeHtmlEntities(str) {
  return str.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');
}

// 1. Fetch Colleges and Departments
async function fetchCollegesWithDepartments() {
  console.log('[1/3] Fetching colleges and departments from byUnion...');
  const html = await fetchText('https://cis.ncu.edu.tw/Course/main/query/byUnion');

  const collegeTables = [];
  const regex = /<table[^>]*>([\s\S]*?)<\/table>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const tableContent = match[1];
    if (tableContent.includes('<th>') && tableContent.includes('/Course/main/query/byUnion?dept=')) {
      collegeTables.push(tableContent);
    }
  }

  const colleges = [];
  const allDepartments = [];

  collegeTables.forEach((table, i) => {
    const collegeId = `collegeI${i}`;
    const thMatch = table.match(/<th>([\s\S]*?)<\/th>/i);
    let collegeName = '';
    if (thMatch) {
      const rawText = thMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      const enMatch = rawText.match(/\(\s*([^)]+)\s*\)/);
      collegeName = enMatch ? enMatch[1].trim() : rawText;
    }

    const deptRegex = /<a[^>]*href=["'][^"']*dept=([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let deptMatch;
    const departments = [];
    while ((deptMatch = deptRegex.exec(table)) !== null) {
      const departmentId = deptMatch[1].trim();
      const departmentName = deptMatch[2].replace(/<[^>]+>/g, '').replace(/\(\d+\)$/, '').trim();
      departments.push({ departmentId, departmentName, collegeId });
      allDepartments.push({ departmentId, departmentName, collegeId });
    }

    colleges.push({
      collegeId,
      collegeName,
      departments,
    });
  });

  console.log(` -> Found ${colleges.length} colleges and ${allDepartments.length} departments.`);
  return { colleges, departments: allDepartments };
}

// 2. Parse Course Base XML
function parseCourseXml(xmlStr, departmentId, collegeId) {
  const courses = [];
  const courseTagRegex = /<Course\s+([^>]+)\/>/gi;
  let tagMatch;

  while ((tagMatch = courseTagRegex.exec(xmlStr)) !== null) {
    const attrsStr = tagMatch[1];
    const attrs = {};
    const attrRegex = /([a-zA-Z0-9_]+)=['"]([^'"]*)['"]/g;
    let attrMatch;
    while ((attrMatch = attrRegex.exec(attrsStr)) !== null) {
      attrs[attrMatch[1]] = attrMatch[2];
    }

    if (!attrs.SerialNo) continue;

    const serialNo = Number(attrs.SerialNo);
    const classNoRaw = attrs.ClassNo || '';
    const classNo = classNoRaw.length > 6 ? `${classNoRaw.slice(0, 6)}-${classNoRaw.slice(6)}` : classNoRaw;
    const title = decodeHtmlEntities(attrs.Title || '');
    const teacherStr = decodeHtmlEntities(attrs.Teacher || '');
    const teachers = teacherStr.split(/,\s*/).map(s => s.trim()).filter(Boolean);
    const classTimesStr = attrs.ClassTime || '';
    const classTimes = classTimesStr.split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .map(([w, h]) => `${w}-${h}`);
    const limitCnt = attrs.limitCnt ? (Number(attrs.limitCnt) === 0 ? null : Number(attrs.limitCnt)) : null;
    const admitCnt = Number(attrs.admitCnt || 0);
    const waitCnt = Number(attrs.waitCnt || 0);
    const credit = Number(attrs.credit || 0);
    const passwordCard = attrs.passwordCard || 'NONE';

    courses.push({
      serialNo,
      classNo,
      title,
      credit,
      passwordCard,
      teachers,
      classTimes,
      limitCnt,
      admitCnt,
      waitCnt,
      collegeId,
      departmentId,
    });
  }

  return courses;
}

// 2. Fetch Course Bases for all departments
async function fetchAllCourses(colleges) {
  console.log('[2/3] Fetching course bases for all departments...');
  const courseMap = new Map();

  for (let cIdx = 0; cIdx < colleges.length; cIdx += 1) {
    const college = colleges[cIdx];
    for (let dIdx = 0; dIdx < college.departments.length; dIdx += 1) {
      const dept = college.departments[dIdx];
      const url = `https://cis.ncu.edu.tw/Course/main/support/course.xml?id=${dept.departmentId}`;
      try {
        const xml = await fetchText(url);
        const deptCourses = parseCourseXml(xml, dept.departmentId, college.collegeId);
        for (const c of deptCourses) {
          if (courseMap.has(c.serialNo)) {
            const existing = courseMap.get(c.serialNo);
            if (!existing.collegeIds.includes(c.collegeId)) existing.collegeIds.push(c.collegeId);
            if (!existing.departmentIds.includes(c.departmentId)) existing.departmentIds.push(c.departmentId);
          } else {
            courseMap.set(c.serialNo, {
              serialNo: c.serialNo,
              classNo: c.classNo,
              title: c.title,
              credit: c.credit,
              passwordCard: c.passwordCard,
              teachers: c.teachers,
              classTimes: c.classTimes,
              limitCnt: c.limitCnt,
              admitCnt: c.admitCnt,
              waitCnt: c.waitCnt,
              collegeIds: [c.collegeId],
              departmentIds: [c.departmentId],
              courseType: 'ELECTIVE',
            });
          }
        }
      } catch (err) {
        console.warn(`  Warning fetching dept ${dept.departmentId}:`, err.message);
      }
      await sleep(30);
    }
  }

  console.log(` -> Fetched total ${courseMap.size} unique courses.`);
  return courseMap;
}

// 3. Fetch Course Extras (Required / Elective)
async function fetchCourseExtras(courseMap) {
  console.log('[3/3] Fetching course types (byKeywords)...');
  let pageNo = 1;
  let updatedCount = 0;

  while (true) {
    const url = `https://cis.ncu.edu.tw/Course/main/query/byKeywords?query=true&d-49489-p=${pageNo}`;
    try {
      const html = await fetchText(url);
      const tableItemMatch = html.match(/<table[^>]*id=["']item["'][^>]*>([\s\S]*?)<\/table>/i);
      if (!tableItemMatch) break;

      const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
      let rowMatch;
      let rowsFound = 0;

      while ((rowMatch = rowRegex.exec(tableItemMatch[1])) !== null) {
        const rowContent = rowMatch[1];
        const tdMatches = [...rowContent.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)];
        if (tdMatches.length >= 6) {
          rowsFound += 1;
          const serialNoHtml = tdMatches[0][1].split(/<br\s*\/?>/i)[0].replace(/<[^>]+>/g, '').trim();
          const serialNo = Number(serialNoHtml);
          const rawType = tdMatches[5][1].replace(/<[^>]+>/g, '').trim();
          let courseType = 'ELECTIVE';
          if (rawType.includes('必修')) courseType = 'REQUIRED';
          else if (rawType.includes('選修')) courseType = 'ELECTIVE';

          if (serialNo && courseMap.has(serialNo)) {
            courseMap.get(serialNo).courseType = courseType;
            updatedCount += 1;
          }
        }
      }

      if (rowsFound === 0) break;

      const hasNext = html.includes(`d-49489-p=${pageNo + 1}`);
      if (!hasNext || html.includes('pagelinks') === false) {
        break;
      }
      pageNo += 1;
      await sleep(50);
    } catch (err) {
      console.warn(`  Error on page ${pageNo}:`, err.message);
      break;
    }
  }

  console.log(` -> Completed ${pageNo} pages, updated types for ${updatedCount} courses.`);
}

async function main() {
  const startTime = new Date();
  console.log(`Starting NCU course fetcher at ${startTime.toISOString()}...`);

  const { colleges, departments } = await fetchCollegesWithDepartments();
  const courseMap = await fetchAllCourses(colleges);
  await fetchCourseExtras(courseMap);

  const courses = Array.from(courseMap.values()).sort((a, b) => a.serialNo - b.serialNo);

  const result = {
    colleges: colleges.map(c => ({ collegeId: c.collegeId, collegeName: c.collegeName })),
    departments: departments.map(d => ({
      departmentId: d.departmentId,
      departmentName: d.departmentName,
      collegeId: d.collegeId,
    })),
    courses,
    LAST_UPDATE_TIME: new Date().toISOString(),
  };

  const defaultOutPath = path.resolve(__dirname, '../public/all.json');
  const targetPath = process.argv[2] ? path.resolve(process.argv[2]) : defaultOutPath;

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, JSON.stringify(result));
  console.log(`Successfully saved course data to ${targetPath}`);
  console.log(`Summary: ${result.colleges.length} colleges, ${result.departments.length} departments, ${result.courses.length} courses.`);
}

main().catch(err => {
  console.error('Fatal error during course fetching:', err);
  process.exit(1);
});
