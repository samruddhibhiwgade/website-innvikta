const fs = require('fs');

// 1. Update src/app/admin/case-studies/page.js
const caseStudiesPath = 'd:\\Innvikta_website_clone\\innvikta-website\\src\\app\\admin\\case-studies\\page.js';
let caseStudiesContent = fs.readFileSync(caseStudiesPath, 'utf8');

// Add textAlignment state
if (!caseStudiesContent.includes('const [textAlignment, setTextAlignment]')) {
  caseStudiesContent = caseStudiesContent.replace(
    'const [contentSource, setContentSource] = useState("manual");',
    'const [contentSource, setContentSource] = useState("manual");\n  const [textAlignment, setTextAlignment] = useState("justify");'
  );
}

// Reset in handleOpenCreate
if (!caseStudiesContent.includes('setTextAlignment("justify");')) {
  caseStudiesContent = caseStudiesContent.replace(
    'setContentSource("manual");',
    'setContentSource("manual");\n    setTextAlignment("justify");'
  );
}

// Load in handleOpenEdit
if (!caseStudiesContent.includes('setTextAlignment(study.textAlignment')) {
  caseStudiesContent = caseStudiesContent.replace(
    'setContentSource(study.pdfUrl ? "pdf" : "manual");',
    'setContentSource(study.pdfUrl ? "pdf" : "manual");\n    setTextAlignment(study.textAlignment || "justify");'
  );
}

// Save in handleSave payload
if (!caseStudiesContent.includes('textAlignment: contentSource === "manual" ? textAlignment : "justify"')) {
  caseStudiesContent = caseStudiesContent.replace(
    'pdfUrl: contentSource === "pdf" ? pdfUrl : ""',
    'pdfUrl: contentSource === "pdf" ? pdfUrl : "",\n      textAlignment: contentSource === "manual" ? textAlignment : "justify"'
  );
}

// UI Dropdown insertion in Form
if (!caseStudiesContent.includes('Text Alignment (in detail page)')) {
  const dropdownMarkup = `                    {/* Text Alignment */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Text Alignment (in detail page)
                      </label>
                      <select
                        value={textAlignment}
                        onChange={(e) => setTextAlignment(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-500 text-sm font-bold"
                      >
                        <option value="justify">Justify</option>
                        <option value="left">Align Left</option>
                        <option value="center">Align Center</option>
                        <option value="right">Align Right</option>
                      </select>
                    </div>\n`;

  caseStudiesContent = caseStudiesContent.replace(
    '<h3 className="text-base font-bold text-slate-900 mb-1">Story Content Blocks</h3>',
    dropdownMarkup + '                    <h3 className="text-base font-bold text-slate-900 mb-1">Story Content Blocks</h3>'
  );
}

fs.writeFileSync(caseStudiesPath, caseStudiesContent, 'utf8');
console.log('Case studies page patched!');


// 2. Update src/app/admin/master-dashboard/page.js
const dashboardPath = 'd:\\Innvikta_website_clone\\innvikta-website\\src\\app\\admin\\master-dashboard\\page.js';
let dashboardContent = fs.readFileSync(dashboardPath, 'utf8');

// Add textAlignment to caseForm initial state
if (!dashboardContent.includes('textAlignment: "justify",')) {
  dashboardContent = dashboardContent.replace(
    'summaryTitle: "",',
    'summaryTitle: "",\n    textAlignment: "justify",'
  );
}

// Add textAlignment reset on create
if (!dashboardContent.includes('textAlignment: "justify",') && dashboardContent.includes('payload.summaryTitle = "";')) {
  dashboardContent = dashboardContent.replace(
    'payload.summaryTitle = "";',
    'payload.summaryTitle = "";\n        payload.textAlignment = "justify";'
  );
}

// Set in handleEditStudy
if (!dashboardContent.includes('textAlignment: study.textAlignment || "justify",')) {
  dashboardContent = dashboardContent.replace(
    'summaryTitle: study.summaryTitle || "",',
    'summaryTitle: study.summaryTitle || "",\n      textAlignment: study.textAlignment || "justify",'
  );
}

// Set in clean reset state on close/open
if (!dashboardContent.includes('textAlignment: "justify",') && dashboardContent.includes('summaryTitle: "",')) {
  dashboardContent = dashboardContent.replace(
    'summaryTitle: "",',
    'summaryTitle: "",\n                    textAlignment: "justify",'
  );
}

// UI Dropdown insertion in Form
if (!dashboardContent.includes('Text Alignment (in detail page)')) {
  const dashboardDropdownMarkup = `                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Text Alignment (in detail page)</label>
                    <select
                      value={caseForm.textAlignment || 'justify'}
                      onChange={(e) => setCaseForm({ ...caseForm, textAlignment: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                    >
                      <option value="justify">Justify</option>
                      <option value="left">Align Left</option>
                      <option value="center">Align Center</option>
                      <option value="right">Align Right</option>
                    </select>
                  </div>\n`;

  dashboardContent = dashboardContent.replace(
    '<div>\n                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Summary Section Title</label>',
    dashboardDropdownMarkup + '                  <div>\n                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Summary Section Title</label>'
  );
}

fs.writeFileSync(dashboardPath, dashboardContent, 'utf8');
console.log('Master dashboard page patched!');
