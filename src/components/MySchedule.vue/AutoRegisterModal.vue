<template>
  <div
    v-if="open"
    class="
      AutoRegisterModal position-fixed top-0 start-0 w-100 h-100
      d-flex align-items-center justify-content-center p-3
    "
    style="background-color: rgba(0, 0, 0, 0.55); z-index: 1080; backdrop-filter: blur(2px);"
    @click.self="$emit('close')"
  >
    <div
      class="bg-white rounded-3 shadow-lg w-100 d-flex flex-column border-0"
      style="max-width: 600px; max-height: 92vh;"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auto-register-modal-title"
    >
      <!-- Header -->
      <div
        class="
          d-flex justify-content-between align-items-center
          px-4 py-3 border-bottom bg-light rounded-top
        "
      >
        <div class="d-flex align-items-center gap-2">
          <span class="badge bg-success p-2 rounded-circle">
            <i class="bi bi-lightning-charge-fill text-white fs-6" />
          </span>
          <div>
            <h5
              id="auto-register-modal-title"
              class="mb-0 fw-bold text-dark"
            >
              一鍵選課書籤
            </h5>
            <small class="text-secondary">NCU Bookmarklet Auto-Registration</small>
          </div>
        </div>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="$emit('close')"
        />
      </div>

      <!-- Body -->
      <div class="p-4 overflow-auto">
        <div
          v-if="targetCourses.length === 0"
          class="alert alert-warning mb-0 d-flex align-items-center gap-2"
        >
          <i class="bi bi-exclamation-triangle-fill fs-5" />
          <div>目前課表沒有可選課程，請先至「課程查詢」勾選欲加選的課程。</div>
        </div>

        <template v-else>
          <!-- Metadata Info Strip -->
          <div
            class="
              d-flex flex-wrap gap-2 mb-3 align-items-center
              justify-content-between bg-light p-2 rounded border small
            "
          >
            <div>
              <span class="text-secondary">建立時間：</span>
              <span class="fw-semibold text-dark">{{ createdAtText }}</span>
            </div>
            <div class="d-flex gap-3">
              <span>
                <span class="text-secondary">已選：</span>
                <span class="fw-bold text-success">{{ targetCourses.length }}</span> 門課
              </span>
              <span>
                <span class="text-secondary">總計：</span>
                <span class="fw-bold text-primary">{{ totalCredits }}</span> 學分
              </span>
            </div>
          </div>

          <!-- Course list pills -->
          <div class="mb-3">
            <div class="d-flex flex-wrap gap-1">
              <span
                v-for="course in targetCourses"
                :key="course.serialNo"
                class="
                  badge bg-white text-dark border p-2
                  d-inline-flex align-items-center gap-1 shadow-sm
                "
              >
                <span class="badge bg-secondary font-monospace">{{ course.serialNo }}</span>
                <span class="fw-bold">{{ course.title }}</span>
                <span
                  v-if="course.teachers && course.teachers.length"
                  class="text-secondary small"
                >({{ course.teachers.join(', ') }})</span>
                <span class="text-muted small">· {{ course.credit }}學分</span>
              </span>
            </div>
          </div>

          <!-- Flow Chart Visual (Matching NCU Selection Steps) -->
          <div class="card bg-light border mb-3">
            <div
              class="
                card-header bg-white py-2 px-3 fw-semibold small
                d-flex align-items-center gap-1 text-secondary
              "
            >
              <i class="bi bi-diagram-3" />
              選課系統執行流程說明
            </div>
            <div class="card-body p-3">
              <!-- Visual Step Pipeline -->
              <div class="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-2">
                <div class="px-2 py-1 bg-white border rounded small text-secondary text-center">
                  Step 1~3<br><span style="font-size: 11px;">前置規定與導師</span>
                </div>
                <i class="bi bi-chevron-right text-muted small" />
                <div
                  class="px-2 py-1 rounded small text-center fw-bold shadow-sm"
                  style="background-color: #e8f5e9; border: 2px solid #198754; color: #198754;"
                >
                  Step 4 挑選課程<br><span style="font-size: 11px;">(在此頁點擊選課)</span>
                </div>
                <i class="bi bi-chevron-right text-muted small" />
                <div class="px-2 py-1 bg-white border rounded small text-secondary text-center">
                  Step 5~6<br><span style="font-size: 11px;">志願與課表確認</span>
                </div>
              </div>
              <div
                class="
                  alert alert-info py-1 px-2 mb-0 small
                  text-dark d-flex align-items-center gap-2
                "
              >
                <i class="bi bi-info-circle-fill text-info" />
                <span>
                  <strong>必須進入【Step 4 挑選課程】</strong>才可進行加選；小工具面板提供直覺點擊按鈕。
                </span>
              </div>
            </div>
          </div>

          <!-- Main Bookmarklet Drag Button -->
          <div class="border rounded p-3 mb-3 bg-white text-center shadow-sm">
            <div class="fw-semibold mb-2 text-dark">
              <i class="bi bi-bookmark-check-fill text-success me-1" />
              拖曳按鈕至瀏覽器書籤列：
            </div>
            <div class="d-grid mb-2">
              <a
                class="btn btn-success btn-lg py-2 fw-bold shadow"
                :href="bookmarklet"
                draggable="true"
                @click.prevent="onBookmarkletClick"
              >
                <i class="bi bi-bookmark-fill me-1" />
                拖我到書籤列 (NCU一鍵選課)
              </a>
            </div>
            <div class="small text-secondary">
              快捷鍵 <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd> 開啟書籤列，按住滑鼠
              <strong>拖曳上方按鈕至書籤列</strong>放開。
            </div>
            <div
              v-if="clickedBookmarklet"
              class="alert alert-warning small mt-2 mb-0 py-2"
            >
              <i class="bi bi-info-circle me-1" />
              請用滑鼠按住按鈕「拖曳」到上方書籤列放開，直接點擊無效。
            </div>
          </div>

          <!-- Concise Instructions -->
          <ol class="ps-3 mb-3 small text-secondary">
            <li>將上方按鈕<strong>拖曳</strong>到瀏覽器書籤列。</li>
            <li>
              登入
              <a
                href="https://portal.ncu.edu.tw/system/cs"
                target="_blank"
                rel="noopener"
                class="fw-semibold"
              >NCU Portal 選課系統</a>
              或直接進入
              <a
                href="https://cis.ncu.edu.tw/Course/main/sign/selectCourse"
                target="_blank"
                rel="noopener"
                class="fw-semibold"
              >選課系統 (cis.ncu.edu.tw)</a>。
            </li>
            <li>
              完成前面步驟，進入 <strong>「Step 4 挑選課程」</strong>。
              <div class="text-muted small mt-1">
                ※ 若在 Portal 內嵌頁面點擊，書籤會自動提示並為您切換至獨立頁面。
              </div>
            </li>
            <li>
              點擊書籤開啟選課面板，右上角將自動逐課加選並呈現課名與進度，亦可點擊面板按鈕手動開始。
            </li>
          </ol>

          <!-- Source code (collapsible) -->
          <details class="mt-2 border rounded p-2 bg-light">
            <summary
              class="
                small fw-semibold text-secondary
                d-flex justify-content-between align-items-center
              "
              style="cursor: pointer;"
            >
              <span><i class="bi bi-code-slash me-1" />查看小工具原始碼</span>
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary py-0 px-2"
                style="font-size: 11px;"
                @click.stop="copyCode"
              >
                {{ copied ? '已複製！' : '複製代碼' }}
              </button>
            </summary>
            <pre
              class="bg-white border rounded p-2 mt-2 mb-0 small text-dark font-monospace"
              style="
                white-space: pre-wrap; word-break: break-all;
                max-height: 200px; font-size: 11px;
              "
            >{{ consoleSnippet }}</pre>
          </details>

          <!-- Security Notice -->
          <div class="d-flex align-items-center gap-2 small text-muted mt-3 pt-2 border-top">
            <i class="bi bi-shield-check text-success fs-6" />
            <span>完全於本機瀏覽器同源執行，不經任何第三方伺服器，安全透明。</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import * as Vue from 'vue';

function formatDateTime(d) {
  const pad = n => String(n).padStart(2, '0');
  const y = d.getFullYear();
  const m = pad(d.getMonth() + 1);
  const date = pad(d.getDate());
  const h = pad(d.getHours());
  const min = pad(d.getMinutes());
  return `${y}/${m}/${date} ${h}:${min}`;
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* eslint-disable no-template-curly-in-string */
function buildSnippet(courses, createdAtText) {
  const coursesJson = JSON.stringify(courses.map(c => ({
    s: c.serialNo,
    t: escapeHtml(c.title),
    cr: c.credit || 0,
  })));

  const lines = [
    '(async () => {',
    '  // NCU Course Finder - Bookmarklet Auto Register',
    `  // Generated: ${createdAtText}`,
    `  const COURSES = ${coursesJson};`,
    '  const DELAY = 800;',
    '',
    '  // 1. Handle Portal iframe container',
    '  if (location.hostname === "portal.ncu.edu.tw" || location.hostname.endsWith(".portal.ncu.edu.tw")) {',
    '    let targetUrl = "https://cis.ncu.edu.tw/Course/main/sign/selectCourse";',
    '    const iframes = Array.from(document.querySelectorAll("iframe, frame"));',
    '    const f = iframes.find(el => (el.src || "").includes("/Course/") || (el.src || "").includes("cis.ncu.edu.tw"));',
    '    if (f && f.src) targetUrl = f.src;',
    '    if (confirm("[NCU 選課小幫手] 偵測到您目前在 Portal 內嵌頁面中。\\n\\n因瀏覽器安全性限制，需切換至選課系統獨立頁面 (cis.ncu.edu.tw)。\\n\\n點擊「確定」立即前往選課頁面？")) {',
    '      location.href = targetUrl;',
    '    }',
    '    return;',
    '  }',
    '',
    '  const isCourseDomain = location.hostname === "cis.ncu.edu.tw" || location.hostname === "course.ncu.edu.tw";',
    '  if (!isCourseDomain) {',
    '    alert("[NCU 選課小幫手] 請在中央大學選課系統 (cis.ncu.edu.tw) 或 Portal 頁面中使用此書籤。");',
    '    return;',
    '  }',
    '',
    '  // 2. Mount floating UI panel',
    '  let panel = document.getElementById("ncu-autoreg-panel");',
    '  if (panel) panel.remove();',
    '',
    '  panel = document.createElement("div");',
    '  panel.id = "ncu-autoreg-panel";',
    '  panel.style.cssText = "position:fixed;top:18px;right:18px;z-index:9999999;background:#ffffff;border:2px solid #198754;border-radius:12px;box-shadow:0 12px 36px rgba(0,0,0,0.28);padding:16px;font:14px/1.5 system-ui,-apple-system,sans-serif;width:340px;max-height:88vh;overflow:auto;color:#212529;";',
    '  document.body.appendChild(panel);',
    '',
    '  function renderHeader() {',
    '    return \'<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #dee2e6;padding-bottom:8px;margin-bottom:10px;">\' +',
    '      \'<div><b style="color:#198754;font-size:15px;">NCU 一鍵選課</b> <span style="font-size:12px;color:#6c757d;">(共 \' + COURSES.length + \' 門)</span></div>\' +',
    '      \'<button id="ncuoc-close" style="border:none;background:transparent;font-size:18px;cursor:pointer;color:#6c757d;line-height:1;">✕</button>\' +',
    '      \'</div>\';',
    '  }',
    '',
    '  function getScriptSessionId() {',
    '    try {',
    '      if (window.dwr && window.dwr.engine && window.dwr.engine._scriptSessionId) {',
    '        return window.dwr.engine._scriptSessionId;',
    '      }',
    '    } catch (e) {}',
    '    return null;',
    '  }',
    '',
    '  async function startRegistration() {',
    '    const ssid = getScriptSessionId();',
    '    if (!ssid) {',
    '      alert("[NCU 選課小幫手] 找不到選課 Session (scriptSessionId)，請確認您已登入並處於「Step 4 挑選課程」頁面。");',
    '      return;',
    '    }',
    '',
    '    const box = panel.querySelector("#ncuoc-list");',
    '    const btn = panel.querySelector("#ncuoc-start-btn");',
    '    if (btn) btn.style.display = "none";',
    '    box.innerHTML = "";',
    '',
    '    const URL = location.origin + "/Course/ajax/call/plaincall/SelectCourseService.addCourseBySerialNo.dwr";',
    '    for (let i = 0; i < COURSES.length; i++) {',
    '      const c = COURSES[i];',
    '      const row = document.createElement("div");',
    '      row.style.cssText = "padding:6px 10px;background:#f8f9fa;border-radius:6px;font-size:13px;border-left:3px solid #ffc107;margin-bottom:6px;";',
    '      row.textContent = `[處理中] ${c.s} ${c.t} 加選中...`;',
    '      box.appendChild(row);',
    '',
    '      const body = [',
    '        "callCount=1", "windowName=",',
    '        "c0-scriptName=SelectCourseService", "c0-methodName=addCourseBySerialNo", "c0-id=0",',
    '        "c0-param0=number:" + c.s, "c0-param1=string:",',
    '        "batchId=5", "page=%2FCourse%2Fmain%2Fsign%2FselectCourse%3Fstep%3D3",',
    '        "httpSessionId=", "scriptSessionId=" + ssid, ""',
    '      ].join("\\n");',
    '',
    '      try {',
    '        const r = await fetch(URL, { method: "POST", credentials: "include", headers: { "Content-Type": "text/plain" }, body });',
    '        const t = await r.text();',
    '        let msg = "已送出 (請確認課表)", ok = true, color = "#198754";',
    '        if (t.indexOf("額滿") >= 0) { msg = "人數已額滿"; ok = false; color = "#dc3545"; }',
    '        else if (t.indexOf("衝堂") >= 0) { msg = "時間衝堂"; ok = false; color = "#dc3545"; }',
    '        else if (t.indexOf("不存在") >= 0) { msg = "課號不存在"; ok = false; color = "#dc3545"; }',
    '        else if (t.indexOf("已選") >= 0 || t.indexOf("重複") >= 0) { msg = "已選過此課"; ok = true; color = "#0d6efd"; }',
    '        else if (t.indexOf("加選成功") >= 0 || t.indexOf("成功") >= 0) { msg = "加選成功"; ok = true; color = "#198754"; }',
    '        else if (t.indexOf("handleException") >= 0) { msg = "系統錯誤/未登入"; ok = false; color = "#dc3545"; }',
    '',
    '        row.style.borderLeftColor = color;',
    '        row.textContent = `[${ok ? "成功" : "失敗"}] ${c.s} ${c.t}：${msg}`;',
    '      } catch (e) {',
    '        row.style.borderLeftColor = "#dc3545";',
    '        row.textContent = `[失敗] ${c.s} ${c.t}：連線失敗`;',
    '      }',
    '      await new Promise(res => setTimeout(res, DELAY));',
    '    }',
    '',
    '    const done = document.createElement("div");',
    '    done.style.cssText = "margin-top:10px;padding-top:10px;border-top:1px solid #dee2e6;text-align:center;font-weight:bold;color:#198754;";',
    '    done.innerHTML = \'全部加選程序已完成<br><span style="font-size:12px;color:#6c757d;font-weight:normal;">請切換至「Step 6 課表確認」查看最新結果</span><div style="margin-top:8px;"><button id="ncuoc-restart-btn" style="padding:4px 12px;background:#198754;color:#fff;border:none;border-radius:4px;font-size:12px;cursor:pointer;">重新加選</button></div>\';',
    '    box.appendChild(done);',
    '    panel.querySelector("#ncuoc-restart-btn").onclick = startRegistration;',
    '  }',
    '',
    '  const pageText = document.body ? document.body.innerText : "";',
    '  const isStep4 = pageText.includes("挑選課程") || pageText.includes("Step 4") || pageText.includes("選課面板") || location.pathname.includes("selectCourse");',
    '',
    '  let initialHtml = renderHeader();',
    '  if (!isStep4) {',
    '    initialHtml += \'<div style="background:#fff3cd;color:#664d03;padding:8px 10px;border-radius:6px;font-size:12px;margin-bottom:10px;">\' +',
    '      \'<strong>提示：</strong>請先完成前置步驟，進入【Step 4 挑選課程】頁面，再點擊下方開始按鈕。</div>\';',
    '  }',
    '',
    '  initialHtml += \'<div id="ncuoc-list" style="display:flex;flex-direction:column;gap:4px;margin-bottom:10px;">\' +',
    '    COURSES.map(c => `<div style="padding:4px 8px;background:#f8f9fa;border-radius:4px;font-size:12px;color:#495057;">${c.s} ${c.t}</div>`).join("") +',
    '    \'</div>\' +',
    '    \'<button id="ncuoc-start-btn" style="width:100%;padding:8px;background:#198754;color:#fff;border:none;border-radius:6px;font-weight:bold;font-size:14px;cursor:pointer;">開始一鍵選課</button>\';',
    '',
    '  panel.innerHTML = initialHtml;',
    '  panel.querySelector("#ncuoc-close").onclick = () => panel.remove();',
    '  panel.querySelector("#ncuoc-start-btn").onclick = startRegistration;',
    '',
    '  if (isStep4 && getScriptSessionId()) {',
    '    startRegistration();',
    '  }',
    '})();',
  ];

  return lines.join('\n');
}
/* eslint-enable no-template-curly-in-string */

export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    courses: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['close'],
  setup(props) {
    const copied = Vue.ref(false);
    const clickedBookmarklet = Vue.ref(false);
    const createdAt = Vue.ref(new Date());

    Vue.watch(
      () => props.open,
      isOpen => {
        if (isOpen) {
          createdAt.value = new Date();
          clickedBookmarklet.value = false;
          copied.value = false;
        }
      },
    );

    const createdAtText = Vue.computed(() => formatDateTime(createdAt.value));

    // Exclude reserved-time placeholders
    const targetCourses = Vue.computed(
      () => props.courses.filter(course => !course.isPlaceholder && course.serialNo > 0),
    );

    const totalCredits = Vue.computed(
      () => targetCourses.value.reduce((sum, c) => sum + (c.credit || 0), 0),
    );

    const consoleSnippet = Vue.computed(
      () => buildSnippet(targetCourses.value, createdAtText.value),
    );

    const bookmarklet = Vue.computed(
      () => `javascript:${encodeURIComponent(consoleSnippet.value)}`,
    );

    async function copyCode() {
      try {
        await navigator.clipboard.writeText(consoleSnippet.value);
        copied.value = true;
        setTimeout(() => { copied.value = false; }, 2500);
      } catch {
        // eslint-disable-next-line no-alert
        window.prompt('請手動複製以下代碼：', consoleSnippet.value);
      }
    }

    function onBookmarkletClick() {
      clickedBookmarklet.value = true;
      setTimeout(() => { clickedBookmarklet.value = false; }, 4000);
    }

    return {
      copied,
      clickedBookmarklet,
      createdAtText,
      targetCourses,
      totalCredits,
      consoleSnippet,
      bookmarklet,
      copyCode,
      onBookmarkletClick,
    };
  },
};
</script>
