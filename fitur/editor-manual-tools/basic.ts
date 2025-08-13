<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>DSRT Editor – Basic → Pro (All-in-One)</title>
<style>
/* ========== RESET & THEME ========== */
*{box-sizing:border-box} html,body{height:100%;margin:0}
body{font-family:Inter,system-ui,Segoe UI,Roboto,Arial,sans-serif;background:#0f1115;color:#e8f0ff}
:root{
  --bg:#0f1115; --panel:#141824; --panel-2:#111522; --acc:#00e7ff; --acc-2:#7ef9ff;
  --muted:#9fb3c8; --line:#21283a; --btn:#00e7ff; --btn-t:#0b1221; --danger:#ff6b6b;
}
button{font:inherit} input,select{font:inherit}

/* ========== LAYOUT ========== */
#app{display:grid; grid-template-rows:48px 1fr 52px; height:100vh}
header,footer{background:var(--panel); border-bottom:1px solid var(--line); display:flex; align-items:center; gap:8px; padding:0 10px}
footer{border-top:1px solid var(--line); border-bottom:none; justify-content:center; gap:10px}

#main{display:grid; grid-template-columns:280px 1fr 300px; gap:0; min-height:0}
@media(max-width:980px){ #main{grid-template-columns:0 1fr 0} }

.panel{background:var(--panel); border-right:1px solid var(--line); min-height:0; overflow:auto}
.panel.right{border-right:none; border-left:1px solid var(--line)}

/* ========== HEADER ========== */
.brand{font-weight:700; color:var(--acc); letter-spacing:.3px}
.iconbtn{background:transparent; border:1px solid var(--line); color:var(--acc); padding:6px 10px; border-radius:10px; cursor:pointer}
.iconbtn:hover{border-color:var(--acc)}
.badge{padding:2px 8px; border-radius:999px; background:#0c2630; color:var(--acc-2); font-size:12px}

/* ========== LEFT: TOOL LIST (Collapsible) ========== */
.group{border-bottom:1px dashed var(--line)}
.group summary{list-style:none; cursor:pointer; padding:10px 12px; color:#cfe7ff; display:flex; align-items:center; justify-content:space-between}
.group summary::-webkit-details-marker{display:none}
.group .wrap{padding:0 10px 12px}
.tool{width:100%; display:flex; align-items:center; justify-content:space-between; gap:8px;
  background:var(--panel-2); color:#cfe7ff; border:1px solid var(--line); padding:8px 10px; margin:6px 0; border-radius:10px; cursor:pointer}
.tool:hover{border-color:var(--acc)}
.tool .left{display:flex; align-items:center; gap:10px}
.tool .i{width:24px; height:24px; display:grid; place-items:center; background:#0b1221; border:1px solid var(--line); border-radius:8px}
.tool.active{outline:2px solid var(--acc)}

/* ========== CENTER: CANVAS ========== */
#stage{position:relative; background:#0c0f17; display:grid; place-items:center; min-height:0; overflow:hidden}
canvas{background:#101522; border:1px solid var(--line); border-radius:12px; max-width:100%; max-height:100%; image-rendering:auto}
#uploadArea{position:absolute; top:12px; right:12px; display:flex; gap:8px; z-index:10}
.primary{background:var(--btn); color:var(--btn-t); border:none; padding:8px 12px; border-radius:10px; cursor:pointer; font-weight:700}
.ghost{background:transparent; color:#cfe7ff; border:1px dashed var(--line); padding:8px 12px; border-radius:10px; cursor:pointer}
kbd{background:#121624; border:1px solid var(--line); padding:2px 6px; border-radius:6px; font-family:ui-monospace,SFMono-Regular,Menlo,monospace; color:#cfe7ff}

/* ========== RIGHT: PROPERTIES ========== */
.prop{padding:12px; border-bottom:1px dashed var(--line)}
.prop h4{margin:0 0 8px 0; color:#cfe7ff}
.field{display:grid; gap:6px; margin:8px 0}
.field label{font-size:12px; color:#9fb3c8}
input[type=range]{width:100%}
input[type=color]{height:36px; padding:0; border:none; background:transparent}
.row{display:flex; gap:8px; align-items:center}
.row > *{flex:1}
.small{font-size:12px; color:#9fb3c8}

/* ========== FOOTER BAR ========== */
footer .btn{background:var(--panel-2); color:#cfe7ff; border:1px solid var(--line); padding:8px 12px; border-radius:10px; cursor:pointer}
footer .btn:hover{border-color:var(--acc)}
footer .btn:disabled{opacity:.5; cursor:not-allowed}
</style>
</head>
<body>
<div id="app">
  <header>
    <button id="toggleLeft" class="iconbtn" title="Tampilkan/Sembunyikan Tools"><span>☰</span></button>
    <div class="brand">DSRT Image Editor</div>
    <span class="badge">Core + Advanced + Pro</span>
    <span style="margin-left:auto" class="small">Tips: <kbd>Ctrl/Cmd+Z</kbd> Undo • <kbd>Ctrl/Cmd+Shift+Z</kbd> Redo</span>
  </header>

  <div id="main">
    <!-- LEFT: TOOL LIST -->
    <aside id="left" class="panel">
      <!-- Kelompok Basic -->
      <details class="group" open>
        <summary><strong>Basic</strong><span>▼</span></summary>
        <div class="wrap">
          <button class="tool" data-tool="crop"><span class="left"><span class="i">▭</span>Crop</span><span>drag + apply</span></button>
          <button class="tool" data-tool="rotate"><span class="left"><span class="i">⤾</span>Rotate</span><span>90°/Arbitrary</span></button>
          <button class="tool" data-tool="flip"><span class="left"><span class="i">⇄</span>Flip</span><span>H / V</span></button>
          <button class="tool" data-tool="resize"><span class="left"><span class="i">⤡</span>Resize</span><span>px/%</span></button>
          <button class="tool" data-tool="brush"><span class="left"><span class="i">✎</span>Brush</span><span>size/opacity</span></button>
          <button class="tool" data-tool="eraser"><span class="left"><span class="i">⌫</span>Eraser</span><span>soft/hard</span></button>
          <button class="tool" data-tool="select"><span class="left"><span class="i">□</span>Selection</span><span>rect/lasso</span></button>
          <button class="tool" data-tool="text"><span class="left"><span class="i">T</span>Text</span><span>font/size</span></button>
        </div>
      </details>

      <!-- Kelompok Intermediate -->
      <details class="group" open>
        <summary><strong>Intermediate</strong><span>▼</span></summary>
        <div class="wrap">
          <button class="tool" data-tool="brightnessContrast"><span class="left"><span class="i">☀︎</span>Brightness/Contrast</span><span>linear</span></button>
          <button class="tool" data-tool="levels"><span class="left"><span class="i">≋</span>Levels</span><span>in/out</span></button>
          <button class="tool" data-tool="curves"><span class="left"><span class="i">∿</span>Curves</span><span>RGB</span></button>
          <button class="tool" data-tool="hsl"><span class="left"><span class="i">🎚</span>HSL/Color Balance</span><span>global</span></button>
          <button class="tool" data-tool="sharpen"><span class="left"><span class="i">✦</span>Sharpen</span><span>radius/amount</span></button>
          <button class="tool" data-tool="denoise"><span class="left"><span class="i">≈</span>Denoise</span><span>box/gauss</span></button>
          <button class="tool" data-tool="heal"><span class="left"><span class="i">●</span>Spot Heal</span><span>blend</span></button>
          <button class="tool" data-tool="clone"><span class="left"><span class="i">◎</span>Clone Stamp</span><span>alt-sample</span></button>
          <button class="tool" data-tool="transform"><span class="left"><span class="i">▱</span>Transform</span><span>scale/skew</span></button>
          <button class="tool" data-tool="filters"><span class="left"><span class="i">⭐</span>Preset Filters</span><span>IG-like</span></button>
        </div>
      </details>

      <!-- Kelompok Pro -->
      <details class="group" open>
        <summary><strong>Pro / Restorasi</strong><span>▼</span></summary>
        <div class="wrap">
          <button class="tool" data-tool="frequencySeparation"><span class="left"><span class="i">FS</span>Frequency Separation</span><span>hi/lo</span></button>
          <button class="tool" data-tool="dodgeBurn"><span class="left"><span class="i">☼</span>Dodge & Burn</span><span>exposure</span></button>
          <button class="tool" data-tool="liquify"><span class="left"><span class="i">↯</span>Liquify (Warp)</span><span>mesh</span></button>
          <button class="tool" data-tool="contentAware"><span class="left"><span class="i">🧠</span>Content-Aware Fill</span><span>smart</span></button>
          <button class="tool" data-tool="inpaint"><span class="left"><span class="i">🩹</span>Inpaint (AI)</span><span>mask</span></button>
          <button class="tool" data-tool="outpaint"><span class="left"><span class="i">⬚</span>Outpaint/Extender</span><span>expand</span></button>
          <button class="tool" data-tool="aiUpscale"><span class="left"><span class="i">↑</span>Upscale (AI)</span><span>2x–4x</span></button>
          <button class="tool" data-tool="aiColorize"><span class="left"><span class="i">🎨</span>Colorize B/W (AI)</span><span>auto</span></button>
          <button class="tool" data-tool="tiltShift"><span class="left"><span class="i">⌓</span>Tilt-Shift</span><span>lens</span></button>
          <button class="tool" data-tool="hdrMerge"><span class="left"><span class="i">HDR</span>HDR/Dehaze</span><span>local</span></button>
        </div>
      </details>
    </aside>

    <!-- CENTER: CANVAS -->
    <main id="stage">
      <div id="uploadArea">
        <input id="fileInput" type="file" accept="image/*" hidden />
        <button id="btnOpen" class="primary">Buka Gambar</button>
        <button id="btnResetView" class="ghost" title="Reset view zoom/pan">Reset View</button>
      </div>
      <canvas id="canvas" width="1200" height="800" aria-label="Image canvas"></canvas>
    </main>

    <!-- RIGHT: PROPERTIES -->
    <aside id="right" class="panel right">
      <div class="prop">
        <h4>Status</h4>
        <div class="small" id="status">Belum ada gambar. Upload dulu.</div>
      </div>

      <div class="prop" id="propArea">
        <h4>Properties</h4>
        <div id="propFields" class="small">Pilih tool untuk menampilkan pengaturan.</div>
      </div>

      <div class="prop">
        <h4>Export / Print</h4>
        <div class="field">
          <label>Format</label>
          <select id="expFormat">
            <option value="image/png">PNG (lossless)</option>
            <option value="image/jpeg">JPG (foto)</option>
            <option value="image/webp">WEBP (modern)</option>
          </select>
        </div>
        <div class="field">
          <label>Resolusi Output</label>
          <div class="row">
            <select id="expSize">
              <option value="1">Asli (1x)</option>
              <option value="0.5">Kecil (0.5x)</option>
              <option value="2">Besar (2x)</option>
              <option value="4">Sangat Besar (4x)</option>
              <option value="custom">Custom…</option>
            </select>
            <input id="expW" type="number" placeholder="W px" />
            <input id="expH" type="number" placeholder="H px" />
          </div>
          <div class="small">Tip: untuk cetak, pilih PNG/JPG & atur ukuran final sesuai DPI printer.</div>
        </div>
        <div class="row">
          <button id="btnExport" class="primary">Download</button>
          <button id="btnPrint" class="ghost">Cetak</button>
        </div>
      </div>
    </aside>
  </div>

  <footer>
    <button id="btnUndo" class="btn" disabled>Undo</button>
    <button id="btnRedo" class="btn" disabled>Redo</button>
    <button id="btnSave" class="btn" disabled>Simpan (Session)</button>
    <button id="btnCopy" class="btn" disabled>Copy</button>
  </footer>
</div>

<script>
/* ===========================================================
   CANVAS ENGINE (non-destruktif via History)
   =========================================================== */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const canvas = $('#canvas');
const ctx = canvas.getContext('2d', { willReadFrequently:true });

let baseImg = new Image();
let hasImage = false;
let currentTool = null;
let brush = { size:18, opacity:1, color:'#00e7ff', hardness:0.8 };
let cloneSrc = null;

const history = [];
const future = [];
const maxHistory = 40;

function setStatus(t){ $('#status').textContent = t; }
function enableEditingState(on){
  $('#btnUndo').disabled = !on || history.length<=1;
  $('#btnRedo').disabled = !on || future.length===0;
  $('#btnSave').disabled = !on;
  $('#btnCopy').disabled = !on;
  $('#btnExport').disabled = !on;
  $('#btnPrint').disabled = !on;
}

function snap(){
  if(!hasImage) return;
  try{
    if(history.length>=maxHistory) history.shift();
    history.push(canvas.toDataURL('image/png'));
    future.length = 0;
    enableEditingState(true);
  }catch(e){ console.warn('snap failed',e); }
}
function restore(dataURL){
  return new Promise(res=>{
    const im = new Image();
    im.onload = ()=>{ 
      ctx.clearRect(0,0,canvas.width,canvas.height);
      canvas.width = im.width; canvas.height = im.height;
      ctx.drawImage(im,0,0);
      res();
    };
    im.src = dataURL;
  });
}
async function undo(){
  if(history.length<=1) return;
  const last = history.pop(); future.push(last);
  await restore(history[history.length-1]);
  enableEditingState(true);
}
async function redo(){
  if(future.length===0) return;
  const next = future.pop(); history.push(next);
  await restore(next);
  enableEditingState(true);
}

/* Upload – tanpa auto-zoom, gambar di-fit ke kanvas dengan skala 1:1 sampai batas canvas */
$('#btnOpen').addEventListener('click', ()=>$('#fileInput').click());
$('#fileInput').addEventListener('change', e=>{
  const f = e.target.files[0]; if(!f) return;
  const fr = new FileReader();
  fr.onload = ev=>{
    baseImg = new Image();
    baseImg.onload = ()=>{
      // canvas mengikuti ukuran gambar (tanpa zoom paksa)
      canvas.width = baseImg.width; canvas.height = baseImg.height;
      ctx.drawImage(baseImg,0,0,canvas.width,canvas.height);
      hasImage = true;
      setStatus(`Gambar: ${canvas.width}×${canvas.height} px`);
      snap();
    };
    baseImg.src = ev.target.result;
  };
  fr.readAsDataURL(f);
});

/* Reset view (placeholder: kita tak pakai transform/zoom otomatis) */
$('#btnResetView').addEventListener('click', ()=>{ if(hasImage){ ctx.drawImage(baseImg,0,0,canvas.width,canvas.height); }});

/* Keyboard shortcuts */
document.addEventListener('keydown', (e)=>{
  if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='z'){ e.shiftKey ? redo() : undo(); e.preventDefault(); }
});

/* ===========================================================
   TOOL REGISTRY
   Setiap tool: { id, name, panel(props->html), apply(api) }
   =========================================================== */
const Tools = {};

/* Helper: read pixels / write pixels */
function getImageData(){ return ctx.getImageData(0,0,canvas.width,canvas.height); }
function putImageData(data){ ctx.putImageData(data,0,0); snap(); }

/* ---------- BASIC ---------- */

Tools.crop = {
  panel(){
    return `
      <div class="field"><label>Mode</label>
        <select id="cropMode"><option>Free</option><option>1:1</option><option>4:5</option><option>16:9</option></select>
      </div>
      <div class="row"><button id="applyCrop" class="primary">Apply Crop</button><button id="cancelCrop" class="ghost">Cancel</button></div>
      <div class="small">Drag di kanvas untuk memilih area.</div>
    `;
  },
  init(){
    let start=null, end=null; let dragging=false;
    function drawOverlay(){
      if(!start||!end) return;
      ctx.drawImage(baseImg,0,0,canvas.width,canvas.height);
      const x=Math.min(start.x,end.x), y=Math.min(start.y,end.y);
      const w=Math.abs(end.x-start.x), h=Math.abs(end.y-start.y);
      ctx.strokeStyle='#00e7ff'; ctx.lineWidth=2; ctx.strokeRect(x,y,w,h);
    }
    const onDown = e=>{ if(!hasImage) return; dragging=true; start=pos(e); end=null; };
    const onMove = e=>{ if(!dragging) return; end=pos(e); ctx.drawImage(baseImg,0,0); drawOverlay(); };
    const onUp   = e=>{ dragging=false; end=pos(e); drawOverlay(); };
    function pos(evt){ const r=canvas.getBoundingClientRect(); return {x:evt.clientX-r.left, y:evt.clientY-r.top}; }

    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseup', onUp);

    $('#applyCrop').onclick = ()=>{
      if(!start||!end) return;
      const x=Math.round(Math.min(start.x,end.x));
      const y=Math.round(Math.min(start.y,end.y));
      const w=Math.round(Math.abs(end.x-start.x));
      const h=Math.round(Math.abs(end.y-start.y));
      if(w<4||h<4) return;
      const tmp = document.createElement('canvas'); tmp.width=w; tmp.height=h;
      tmp.getContext('2d').drawImage(canvas,x,y,w,h,0,0,w,h);
      baseImg.src = tmp.toDataURL();
      baseImg.onload = ()=>{ canvas.width=w; canvas.height=h; ctx.drawImage(baseImg,0,0); snap(); };
    };
    $('#cancelCrop').onclick = ()=>{ ctx.drawImage(baseImg,0,0); };

    return ()=>{ // cleanup
      canvas.removeEventListener('mousedown', onDown);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseup', onUp);
    };
  }
};

Tools.rotate = {
  panel(){
    return `
      <div class="row">
        <button id="rotLeft" class="btn">⤺ 90°</button>
        <button id="rotRight" class="btn">90° ⤻</button>
        <button id="rot180" class="btn">180°</button>
      </div>
      <div class="field"><label>Arbitrary (°)</label><input id="rotDeg" type="number" value="0" /></div>
      <button id="rotApply" class="primary">Apply</button>
    `;
  },
  init(){
    const apply = deg=>{
      const rad = deg*Math.PI/180;
      const sin=Math.abs(Math.sin(rad)), cos=Math.abs(Math.cos(rad));
      const w=canvas.width, h=canvas.height;
      const nw=Math.round(w*cos+h*sin), nh=Math.round(w*sin+h*cos);
      const tmp = document.createElement('canvas'); tmp.width=nw; tmp.height=nh;
      const tctx = tmp.getContext('2d');
      tctx.translate(nw/2, nh/2); tctx.rotate(rad);
      tctx.drawImage(canvas, -w/2, -h/2);
      baseImg.src = tmp.toDataURL();
      baseImg.onload = ()=>{ canvas.width=nw; canvas.height=nh; ctx.drawImage(baseImg,0,0); snap(); };
    };
    $('#rotLeft').onclick = ()=>apply(-90);
    $('#rotRight').onclick= ()=>apply(90);
    $('#rot180').onclick  = ()=>apply(180);
    $('#rotApply').onclick= ()=>{ const d=parseFloat($('#rotDeg').value||'0'); apply(d); };
  }
};

Tools.flip = {
  panel(){ return `
    <div class="row">
      <button id="flipH" class="btn">Flip Horizontal</button>
      <button id="flipV" class="btn">Flip Vertical</button>
    </div>`; },
  init(){
    const apply = (hx,vy)=>{
      const tmp=document.createElement('canvas'); tmp.width=canvas.width; tmp.height=canvas.height;
      const t=tmp.getContext('2d'); t.translate(hx?-canvas.width:0, vy?-canvas.height:0); t.scale(hx?-1:1, vy?-1:1);
      t.drawImage(canvas,0,0); baseImg.src=tmp.toDataURL();
      baseImg.onload=()=>{ ctx.drawImage(baseImg,0,0); snap(); };
    };
    $('#flipH').onclick=()=>apply(true,false);
    $('#flipV').onclick=()=>apply(false,true);
  }
};

Tools.resize = {
  panel(){ return `
    <div class="row">
      <input id="rszW" type="number" placeholder="Width (px)" />
      <input id="rszH" type="number" placeholder="Height (px)" />
    </div>
    <div class="field"><label>Scale (%)</label><input id="rszS" type="number" value="100"></div>
    <button id="rszApply" class="primary">Apply</button>
    <div class="small">Menjaga rasio? Isi salah satu dimensi atau gunakan Scale.</div>
  `; },
  init(){
    $('#rszApply').onclick=()=>{
      let W=parseInt($('#rszW').value||0), H=parseInt($('#rszH').value||0), S=parseFloat($('#rszS').value||100)/100;
      if(!W && !H){ W=Math.round(canvas.width*S); H=Math.round(canvas.height*S); }
      else if(W && !H){ H=Math.round(W*canvas.height/canvas.width); }
      else if(H && !W){ W=Math.round(H*canvas.width/canvas.height); }
      if(W<4||H<4) return;
      const tmp=document.createElement('canvas'); tmp.width=W; tmp.height=H;
      tmp.getContext('2d').imageSmoothingQuality='high';
      tmp.getContext('2d').drawImage(canvas,0,0,W,H);
      baseImg.src=tmp.toDataURL();
      baseImg.onload=()=>{ canvas.width=W; canvas.height=H; ctx.drawImage(baseImg,0,0); snap(); };
    };
  }
};

Tools.brush = {
  panel(){ return `
    <div class="field"><label>Ukuran</label><input id="bSize" type="range" min="1" max="200" value="${brush.size}"></div>
    <div class="field"><label>Opacity</label><input id="bOp" type="range" min="0.05" max="1" step="0.05" value="${brush.opacity}"></div>
    <div class="field"><label>Warna</label><input id="bColor" type="color" value="${brush.color}"></div>
    <div class="field"><label>Kekerasan</label><input id="bHard" type="range" min="0" max="1" step="0.05" value="${brush.hardness}"></div>
    <div class="small">Klik & seret untuk melukis.</div>
  `; },
  init(){
    $('#bSize').oninput = e=>brush.size=+e.target.value;
    $('#bOp').oninput   = e=>brush.opacity=+e.target.value;
    $('#bColor').oninput= e=>brush.color=e.target.value;
    $('#bHard').oninput = e=>brush.hardness=+e.target.value;

    let draw=false, last=null;
    const down = e=>{ if(!hasImage) return; draw=true; last=pos(e); };
    const move = e=>{
      if(!draw) return;
      const p=pos(e);
      paint(last,p);
      last=p;
    };
    const up = ()=>{ if(draw){ draw=false; snap(); } };

    function paint(a,b){
      const g=ctx.createRadialGradient(b.x,b.y,Math.max(1,brush.size*(1-brush.hardness)), b.x,b.y,brush.size);
      g.addColorStop(0, hex2rgba(brush.color,brush.opacity));
      g.addColorStop(1, hex2rgba(brush.color,0));
      ctx.globalCompositeOperation='source-over';
      ctx.fillStyle=g;
      ctx.beginPath(); ctx.arc(b.x,b.y,brush.size,0,Math.PI*2); ctx.fill();
    }
    function pos(evt){ const r=canvas.getBoundingClientRect(); return {x:evt.clientX-r.left, y:evt.clientY-r.top}; }

    canvas.addEventListener('mousedown', down);
    canvas.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return ()=>{ canvas.removeEventListener('mousedown',down); canvas.removeEventListener('mousemove',move); window.removeEventListener('mouseup',up); };
  }
};

Tools.eraser = {
  panel(){ return `
    <div class="field"><label>Ukuran</label><input id="eSize" type="range" min="5" max="200" value="40"></div>
    <div class="field"><label>Kelembutan</label><input id="eSoft" type="range" min="0" max="1" step="0.05" value="0.6"></div>
  `; },
  init(){
    let size=40, soft=0.6; $('#eSize').oninput=e=>size=+e.target.value; $('#eSoft').oninput=e=>soft=+e.target.value;
    let draw=false;
    const down=e=>{ if(!hasImage) return; draw=true; };
    const move=e=>{
      if(!draw) return;
      const p=pos(e);
      const g=ctx.createRadialGradient(p.x,p.y,Math.max(1,size*(1-soft)), p.x,p.y,size);
      g.addColorStop(0, 'rgba(0,0,0,1)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalCompositeOperation='destination-out';
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(p.x,p.y,size,0,Math.PI*2); ctx.fill();
    };
    const up=()=>{ if(draw){ draw=false; ctx.globalCompositeOperation='source-over'; snap(); } };
    function pos(evt){ const r=canvas.getBoundingClientRect(); return {x:evt.clientX-r.left, y:evt.clientY-r.top}; }
    canvas.addEventListener('mousedown',down); canvas.addEventListener('mousemove',move); window.addEventListener('mouseup',up);
    return ()=>{ canvas.removeEventListener('mousedown',down); canvas.removeEventListener('mousemove',move); window.removeEventListener('mouseup',up); };
  }
};

Tools.select = {
  panel(){ return `<div class="small">Pilih area persegi (versi ringkas). Gunakan dengan Clone/Heal.</div>`; },
  init(){
    // Minimal rectangle selection for interoperability
    let start=null, end=null, dragging=false;
    const down=e=>{ dragging=true; start=pos(e); end=null; };
    const move=e=>{ if(!dragging) return; end=pos(e); ctx.drawImage(baseImg,0,0); draw(); };
    const up  =e=>{ dragging=false; end=pos(e); draw(); };
    function draw(){
      if(!start||!end) return;
      const x=Math.min(start.x,end.x), y=Math.min(start.y,end.y);
      const w=Math.abs(end.x-start.x), h=Math.abs(end.y-start.y);
      ctx.strokeStyle='#7ef9ff'; ctx.setLineDash([6,4]); ctx.strokeRect(x,y,w,h); ctx.setLineDash([]);
      selection = {x,y,w,h};
    }
    function pos(evt){ const r=canvas.getBoundingClientRect(); return {x:evt.clientX-r.left, y:evt.clientY-r.top}; }
    let selection=null;
    canvas.addEventListener('mousedown',down); canvas.addEventListener('mousemove',move); window.addEventListener('mouseup',up);
    // Expose selection getter for clone/heal
    Tools.select.getSelection = ()=>selection;
    return ()=>{ canvas.removeEventListener('mousedown',down); canvas.removeEventListener('mousemove',move); window.removeEventListener('mouseup',up); };
  }
};

Tools.text = {
  panel(){ return `
    <div class="field"><label>Teks</label><input id="tx" placeholder="Tuliskan sesuatu…"/></div>
    <div class="row"><input id="txSize" type="number" value="64"/><input id="txColor" type="color" value="#ffffff"/></div>
    <button id="txPlace" class="primary">Klik di kanvas untuk menempatkan</button>
  `; },
  init(){
    let placing=false;
    $('#txPlace').onclick=()=>{ placing=true; setStatus('Klik di kanvas untuk menempatkan teks.'); };
    const click=e=>{
      if(!placing) return;
      const r=canvas.getBoundingClientRect(); const x=e.clientX-r.left, y=e.clientY-r.top;
      const text=$('#tx').value||''; const size=parseInt($('#txSize').value||'48'); const color=$('#txColor').value||'#fff';
      ctx.fillStyle=color; ctx.font=`${size}px/1.2 Inter,system-ui,sans-serif`; ctx.textBaseline='top'; ctx.fillText(text,x,y);
      placing=false; snap(); setStatus('Teks ditambahkan.');
    };
    canvas.addEventListener('click',click);
    return ()=>canvas.removeEventListener('click',click);
  }
};

/* ---------- INTERMEDIATE ---------- */

Tools.brightnessContrast = {
  panel(){ return `
    <div class="field"><label>Brightness</label><input id="br" type="range" min="-100" max="100" value="0"></div>
    <div class="field"><label>Contrast</label><input id="ct" type="range" min="-100" max="100" value="0"></div>
    <button id="bcApply" class="primary">Apply</button>
  `; },
  init(){
    $('#bcApply').onclick=()=>{
      const B=+$('#br').value, C=+$('#ct').value;
      const img=getImageData(), d=img.data;
      const factor=(259*(C+255))/(255*(259-C));
      for(let i=0;i<d.length;i+=4){
        d[i]   = clamp(factor*(d[i]-128)+128 + 2.55*B);
        d[i+1] = clamp(factor*(d[i+1]-128)+128 + 2.55*B);
        d[i+2] = clamp(factor*(d[i+2]-128)+128 + 2.55*B);
      }
      putImageData(img);
    };
  }
};

Tools.levels = {
  panel(){ return `
    <div class="field"><label>Input (shadows/mid/high)</label>
      <div class="row"><input id="lvInL" type="number" value="0"/><input id="lvInM" type="number" value="1" step="0.01"/><input id="lvInH" type="number" value="255"/></div>
    </div>
    <div class="field"><label>Output (black/white)</label>
      <div class="row"><input id="lvOutL" type="number" value="0"/><input id="lvOutH" type="number" value="255"/></div>
    </div>
    <button id="lvApply" class="primary">Apply</button>
  `; },
  init(){
    $('#lvApply').onclick=()=>{
      let inL=+$('#lvInL').value, inM=+$('#lvInM').value, inH=+$('#lvInH').value, outL=+$('#lvOutL').value, outH=+$('#lvOutH').value;
      inL=Math.max(0,Math.min(254,inL)); inH=Math.max(1,Math.min(255,inH)); if(inH<=inL) inH=inL+1;
      const img=getImageData(), d=img.data; const range=inH-inL;
      for(let i=0;i<d.length;i+=4){
        for(let c=0;c<3;c++){
          let v=d[i+c]; v=(v-inL)/range; v=Math.max(0,Math.min(1,v)); // normalize
          // midtone gamma
          v=Math.pow(v, 1/Math.max(0.01,inM));
          v = outL + v*(outH-outL);
          d[i+c]=clamp(v);
        }
      }
      putImageData(img);
    };
  }
};

Tools.curves = {
  panel(){ return `
    <div class="field"><label>Kurva sederhana</label>
      <select id="cvPreset">
        <option value="linear">Linear</option>
        <option value="s">S-curve (contrast)</option>
        <option value="fade">Fade</option>
        <option value="liftShadows">Lift Shadows</option>
      </select>
    </div>
    <button id="cvApply" class="primary">Apply</button>
  `; },
  init(){
    $('#cvApply').onclick=()=>{
      const p=$('#cvPreset').value;
      const img=getImageData(), d=img.data;
      const map=new Uint8ClampedArray(256);
      for(let i=0;i<256;i++){
        let v=i/255;
        if(p==='s'){ v = (1/(1+Math.exp(-8*(v-0.5)))) } // sigmoid
        else if(p==='fade'){ v = v*0.9+0.05 }
        else if(p==='liftShadows'){ v = Math.pow(v,0.9)+0.05; v=Math.min(v,1); }
        map[i]=Math.round(v*255);
      }
      for(let i=0;i<d.length;i+=4){ d[i]=map[d[i]]; d[i+1]=map[d[i+1]]; d[i+2]=map[d[i+2]]; }
      putImageData(img);
    };
  }
};

Tools.hsl = {
  panel(){ return `
    <div class="field"><label>Hue (°)</label><input id="hHue" type="range" min="-180" max="180" value="0"></div>
    <div class="field"><label>Saturation (%)</label><input id="hSat" type="range" min="-100" max="100" value="0"></div>
    <div class="field"><label>Lightness (%)</label><input id="hLig" type="range" min="-100" max="100" value="0"></div>
    <button id="hslApply" class="primary">Apply</button>
  `; },
  init(){
    $('#hslApply').onclick=()=>{
      const H=+$('#hHue').value, S=+$('#hSat').value/100, L=+$('#hLig').value/100;
      const img=getImageData(), d=img.data;
      for(let i=0;i<d.length;i+=4){
        const hsl = rgb2hsl(d[i],d[i+1],d[i+2]);
        hsl.h = (hsl.h + H + 360) % 360;
        hsl.s = clamp01(hsl.s + S);
        hsl.l = clamp01(hsl.l + L);
        const rgb = hsl2rgb(hsl.h,hsl.s,hsl.l);
        d[i]=rgb.r; d[i+1]=rgb.g; d[i+2]=rgb.b;
      }
      putImageData(img);
    };
  }
};

Tools.sharpen = {
  panel(){ return `
    <div class="field"><label>Amount</label><input id="shAmt" type="range" min="0" max="3" step="0.1" value="1.2"></div>
    <div class="field"><label>Radius(px)</label><input id="shRad" type="range" min="0" max="5" step="0.5" value="1.0"></div>
    <button id="shApply" class="primary">Apply</button>
  `; },
  init(){
    $('#shApply').onclick=()=>{
      const amt=+$('#shAmt').value, rad=+$('#shRad').value;
      const img=getImageData();
      const blur=gaussBlur(img, Math.max(0.1,rad));
      // unsharp mask
      for(let i=0;i<img.data.length;i+=4){
        for(let c=0;c<3;c++){
          const o=img.data[i+c], b=blur.data[i+c];
          img.data[i+c]=clamp(o + amt*(o-b));
        }
      }
      putImageData(img);
    };
  }
};

Tools.denoise = {
  panel(){ return `
    <div class="field"><label>Kekuatan</label><input id="dnAmt" type="range" min="0" max="10" value="2"></div>
    <button id="dnApply" class="primary">Apply</button>
  `; },
  init(){
    $('#dnApply').onclick=()=>{
      const k=+$('#dnAmt').value;
      const img=getImageData();
      const out = boxBlur(img, Math.max(1,Math.round(k)));
      putImageData(out);
    };
  }
};

Tools.heal = {
  panel(){ return `
    <div class="field"><label>Ukuran</label><input id="hlSize" type="range" min="8" max="200" value="32"></div>
    <div class="small">Klik noda untuk memperhalus (blend sederhana).</div>
  `; },
  init(){
    let size=32; $('#hlSize').oninput=e=>size=+e.target.value;
    const click=e=>{
      const r=canvas.getBoundingClientRect(); const x=Math.floor(e.clientX-r.left), y=Math.floor(e.clientY-r.top);
      const img=getImageData(); const out=img.data; const rad=size;
      // Simple neighborhood average blend
      const w=img.width, h=img.height;
      for(let yy=-rad; yy<=rad; yy++){
        for(let xx=-rad; xx<=rad; xx++){
          const nx=x+xx, ny=y+yy; if(nx<0||ny<0||nx>=w||ny>=h) continue;
          const di=(ny*w+nx)*4;
          // sample around
          let rSum=0,gSum=0,bSum=0,count=0;
          for(let sy=-2; sy<=2; sy++){
            for(let sx=-2; sx<=2; sx++){
              const ax=nx+sx, ay=ny+sy; if(ax<0||ay<0||ax>=w||ay>=h) continue;
              const si=(ay*w+ax)*4;
              rSum+=img.data[si]; gSum+=img.data[si+1]; bSum+=img.data[si+2]; count++;
            }
          }
          out[di]=clamp(rSum/count); out[di+1]=clamp(gSum/count); out[di+2]=clamp(bSum/count);
        }
      }
      putImageData(img);
    };
    canvas.addEventListener('click',click);
    return ()=>canvas.removeEventListener('click',click);
  }
};

Tools.clone = {
  panel(){ return `
    <div class="field"><label>Ukuran</label><input id="clSize" type="range" min="8" max="200" value="40"></div>
    <div class="small">Alt+Klik untuk memilih sumber, lalu lukis.</div>
  `; },
  init(){
    let size=40; $('#clSize').oninput=e=>size=+e.target.value;
    let sampling=false, src=null, draw=false, last=null;
    canvas.addEventListener('mousedown', e=>{
      if(e.altKey){ sampling=true; src=pos(e); setStatus(`Sumber di (${src.x|0}, ${src.y|0})`); }
      else { draw=true; last=pos(e); }
    });
    canvas.addEventListener('mousemove', e=>{
      if(!draw||!src) return;
      const p=pos(e);
      cloneStamp(src, p, size);
      last=p;
    });
    window.addEventListener('mouseup', ()=>{ if(draw){ draw=false; snap(); } sampling=false; });

    function cloneStamp(s, d, r){
      const t = ctx.getImageData(s.x-r, s.y-r, r*2, r*2);
      ctx.putImageData(t, d.x-r, d.y-r);
    }
    function pos(evt){ const r=canvas.getBoundingClientRect(); return {x:evt.clientX-r.left, y:evt.clientY-r.top}; }
    return ()=>{};
  }
};

Tools.transform = {
  panel(){ return `<div class="small">Transform dasar (scale/rotate) gunakan tool Rotate/Resize. Versi mesh untuk Liquify ada di Pro.</div>`; },
  init(){ /* intentionally minimal */ }
};

Tools.filters = {
  panel(){ return `
    <div class="field"><label>Preset</label>
      <select id="flt">
        <option value="none">None</option>
        <option value="grayscale">Grayscale</option>
        <option value="sepia">Sepia</option>
        <option value="invert">Invert</option>
        <option value="vintage">Vintage</option>
        <option value="film">Film</option>
        <option value="vibrant">Vibrant</option>
        <option value="cool">Cool</option>
        <option value="warm">Warm</option>
        <option value="matte">Matte</option>
        <option value="dramatic">Dramatic</option>
      </select>
    </div>
    <button id="fltApply" class="primary">Apply</button>
  `; },
  init(){
    $('#fltApply').onclick=()=>{
      const v=$('#flt').value;
      // Implement langsung via pixel ops agar non-destruktif di canvas (bukan CSS filter)
      const img=getImageData(), d=img.data;
      const W=canvas.width, H=canvas.height;
      if(v==='grayscale'){ for(let i=0;i<d.length;i+=4){ const g=0.2126*d[i]+0.7152*d[i+1]+0.0722*d[i+2]; d[i]=d[i+1]=d[i+2]=g; } }
      else if(v==='sepia'){ for(let i=0;i<d.length;i+=4){ const r=d[i],g=d[i+1],b=d[i+2]; d[i]=clamp(0.393*r+0.769*g+0.189*b); d[i+1]=clamp(0.349*r+0.686*g+0.168*b); d[i+2]=clamp(0.272*r+0.534*g+0.131*b);} }
      else if(v==='invert'){ for(let i=0;i<d.length;i+=4){ d[i]=255-d[i]; d[i+1]=255-d[i+1]; d[i+2]=255-d[i+2]; } }
      else if(v==='vintage'){ curvesMap(d, t=>t*0.9+12); tint(d,255,200,150,0.08); }
      else if(v==='film'){ grain(d, W,H,8); curvesMap(d, t=>Math.min(255, t*1.05)); }
      else if(v==='vibrant'){ saturate(d, 0.25); contrast(d, 10); }
      else if(v==='cool'){ tint(d, 140, 180, 255, 0.12); }
      else if(v==='warm'){ tint(d, 255, 200, 150, 0.12); }
      else if(v==='matte'){ liftShadows(d,12); contrast(d,-5); }
      else if(v==='dramatic'){ contrast(d,18); saturate(d,-0.1); }
      putImageData(img);
    };
  }
};

/* ---------- PRO / RESTORASI ---------- */

Tools.frequencySeparation = {
  panel(){ return `
    <div class="field"><label>Radius (Lo-Freq blur)</label><input id="fsRad" type="range" min="1" max="8" value="3"></div>
    <button id="fsApply" class="primary">Apply (flatten)</button>
    <div class="small">Versi cepat (flatten hasil). Workflow layer bisa kamu sambung di pipeline-mu.</div>
  `; },
  init(){
    $('#fsApply').onclick=()=>{
      const r=+$('#fsRad').value;
      const img=getImageData();
      const lo=gaussBlur(cloneImageData(img), r);
      // hi = original - lo + 128
      const hi=cloneImageData(img);
      for(let i=0;i<img.data.length;i+=4){
        hi.data[i]   = clamp( (img.data[i]-lo.data[i]) + 128 );
        hi.data[i+1] = clamp( (img.data[i+1]-lo.data[i+1]) + 128 );
        hi.data[i+2] = clamp( (img.data[i+2]-lo.data[i+2]) + 128 );
      }
      // merge kembali (lo + (hi-128))
      for(let i=0;i<img.data.length;i+=4){
        img.data[i]   = clamp( lo.data[i]   + (hi.data[i]-128) );
        img.data[i+1] = clamp( lo.data[i+1] + (hi.data[i+1]-128) );
        img.data[i+2] = clamp( lo.data[i+2] + (hi.data[i+2]-128) );
      }
      putImageData(img);
    };
  }
};

Tools.dodgeBurn = {
  panel(){ return `
    <div class="field"><label>Mode</label><select id="dbMode"><option value="dodge">Dodge (terang)</option><option value="burn">Burn (gelap)</option></select></div>
    <div class="field"><label>Ukuran</label><input id="dbSize" type="range" min="10" max="200" value="60"></div>
    <div class="field"><label>Exposure</label><input id="dbExp" type="range" min="0.05" max="0.8" step="0.05" value="0.2"></div>
    <div class="small">Lukis pada area yang ingin diangkat/diturunkan.</div>
  `; },
  init(){
    let mode='dodge', size=60, exp=0.2;
    $('#dbMode').onchange=e=>mode=e.target.value;
    $('#dbSize').oninput=e=>size=+e.target.value;
    $('#dbExp').oninput=e=>exp=+e.target.value;

    let draw=false;
    const down=()=>draw=true, up=()=>{ if(draw){ draw=false; snap(); } };
    const move=e=>{
      if(!draw) return;
      const p=pos(e);
      const img=getImageData(), d=img.data, w=img.width, h=img.height;
      const rad=size;
      for(let yy=-rad; yy<=rad; yy++){
        for(let xx=-rad; xx<=rad; xx++){
          const nx=p.x|0+xx, ny=p.y|0+yy; if(nx<0||ny<0||nx>=w||ny>=h) continue;
          const di=(ny*w+nx)*4;
          const fall = 1 - Math.min(1, Math.hypot(xx,yy)/rad);
          const k = exp*fall;
          if(mode==='dodge'){ d[di]=clamp(d[di]*(1+k)); d[di+1]=clamp(d[di+1]*(1+k)); d[di+2]=clamp(d[di+2]*(1+k)); }
          else { d[di]=clamp(d[di]*(1-k)); d[di+1]=clamp(d[di+1]*(1-k)); d[di+2]=clamp(d[di+2]*(1-k)); }
        }
      }
      putImageData(img);
    };
    canvas.addEventListener('mousedown',down); window.addEventListener('mouseup',up); canvas.addEventListener('mousemove',move);
    function pos(evt){ const r=canvas.getBoundingClientRect(); return {x:evt.clientX-r.left, y:evt.clientY-r.top}; }
    return ()=>{ canvas.removeEventListener('mousedown',down); window.removeEventListener('mouseup',up); canvas.removeEventListener('mousemove',move); };
  }
};

Tools.liquify = {
  panel(){ return `<div class="small">Versi ringkas: dorong piksel mengikuti kuas (warp). Ukuran gunakan Brush tool (shared).</div>`; },
  init(){
    let size=brush.size;
    let draw=false;
    const down=e=>{ draw=true; last=pos(e); };
    let last=null;
    const move=e=>{
      if(!draw) return;
      const p=pos(e);
      // sample & shift small patch
      const r=size|0;
      const dx=(p.x-last.x), dy=(p.y-last.y);
      const tmp=ctx.getImageData(p.x-r, p.y-r, r*2, r*2);
      ctx.putImageData(tmp, p.x-r+dx*0.4, p.y-r+dy*0.4);
      last=p;
    };
    const up=()=>{ if(draw){ draw=false; snap(); } };
    function pos(evt){ const r=canvas.getBoundingClientRect(); return {x:evt.clientX-r.left, y:evt.clientY-r.top}; }
    canvas.addEventListener('mousedown',down); canvas.addEventListener('mousemove',move); window.addEventListener('mouseup',up);
    return ()=>{ canvas.removeEventListener('mousedown',down); canvas.removeEventListener('mousemove',move); window.removeEventListener('mouseup',up); };
  }
};

Tools.contentAware = {
  panel(){ return `<div class="small">Isi area terpilih secara pintar. (Stub cepat: blur + clone lokal). Untuk AI model, hubungkan endpoint-mu di sini.</div>
    <button id="cafApply" class="primary">Apply pada Selection</button>`; },
  init(){
    $('#cafApply').onclick=()=>{
      const sel = Tools.select.getSelection?.();
      if(!sel){ alert('Buat selection dulu di tool Selection.'); return; }
      const patch = ctx.getImageData(sel.x,sel.y,sel.w,sel.h);
      const smooth = boxBlur(patch, 6);
      ctx.putImageData(smooth, sel.x, sel.y);
      snap();
    };
  }
};

Tools.inpaint = {
  panel(){ return `
    <div class="field"><label>Ukuran Kuas Mask</label><input id="ipSize" type="range" min="8" max="200" value="40"></div>
    <div class="row"><button id="ipPaint" class="btn">Paint Mask</button><button id="ipRun" class="primary">Jalankan (Stub)</button></div>
    <div class="small">Integrasi AI: kirimkan {image, mask} ke server. Stub: blur area masked.</div>
  `; },
  init(){
    let size=40, painting=false;
    $('#ipSize').oninput=e=>size=+e.target.value;
    $('#ipPaint').onclick=()=>{ painting=true; setStatus('Mode Paint Mask aktif. Drag di area yang ingin dihapus.'); };

    const mask=document.createElement('canvas'); mask.width=canvas.width; mask.height=canvas.height;
    const mctx=mask.getContext('2d'); mctx.clearRect(0,0,mask.width,mask.height);

    let draw=false;
    const down=e=>{ if(!painting) return; draw=true; };
    const move=e=>{
      if(!draw) return;
      const p=pos(e);
      mctx.fillStyle='white'; mctx.beginPath(); mctx.arc(p.x,p.y,size,0,Math.PI*2); mctx.fill();
      // Preview overlay
      ctx.save(); ctx.globalAlpha=0.3; ctx.drawImage(mask,0,0); ctx.restore();
    };
    const up=()=>{ if(draw){ draw=false; } };

    $('#ipRun').onclick=()=>{
      // Stub: blur masked pixels
      const img=getImageData(), d=img.data, w=img.width, h=img.height;
      const m=mctx.getImageData(0,0,w,h).data;
      const blurred=gaussBlur(img, 4).data;
      for(let i=0;i<d.length;i+=4){ if(m[i]>0){ d[i]=blurred[i]; d[i+1]=blurred[i+1]; d[i+2]=blurred[i+2]; } }
      putImageData(img); mctx.clearRect(0,0,w,h); painting=false; setStatus('Inpaint (stub) selesai.');
    };

    function pos(evt){ const r=canvas.getBoundingClientRect(); return {x:evt.clientX-r.left, y:evt.clientY-r.top}; }
    canvas.addEventListener('mousedown',down); canvas.addEventListener('mousemove',move); window.addEventListener('mouseup',up);
    return ()=>{ canvas.removeEventListener('mousedown',down); canvas.removeEventListener('mousemove',move); window.removeEventListener('mouseup',up); };
  }
};

Tools.outpaint = {
  panel(){ return `
    <div class="field"><label>Tambah Kanvas</label>
      <div class="row"><input id="opL" type="number" value="200"/><input id="opR" type="number" value="200"/></div>
      <div class="row"><input id="opT" type="number" value="200"/><input id="opB" type="number" value="200"/></div>
    </div>
    <button id="opApply" class="primary">Perbesar (Extender)</button>
    <div class="small">Stub: perluasan latar sederhana (isi warna rata). Hubungkan AI outpaint untuk hasil cerdas.</div>
  `; },
  init(){
    $('#opApply').onclick=()=>{
      const L=+$('#opL').value, R=+$('#opR').value, T=+$('#opT').value, B=+$('#opB').value;
      const tmp=document.createElement('canvas'); tmp.width=canvas.width+L+R; tmp.height=canvas.height+T+B;
      const t=tmp.getContext('2d'); t.fillStyle=avgColor(); t.fillRect(0,0,tmp.width,tmp.height);
      t.drawImage(canvas, L, T);
      baseImg.src=tmp.toDataURL(); baseImg.onload=()=>{ canvas.width=tmp.width; canvas.height=tmp.height; ctx.drawImage(baseImg,0,0); snap(); };
    };
  }
};

Tools.aiUpscale = {
  panel(){ return `
    <div class="field"><label>Faktor</label><select id="upF"><option>2</option><option>3</option><option>4</option></select></div>
    <button id="upRun" class="primary">Upscale</button>
    <div class="small">Stub: bicubic (canvas). Sambungkan model SR untuk hasil pro.</div>
  `; },
  init(){
    $('#upRun').onclick=()=>{
      const f=+$('#upF').value;
      const W=canvas.width*f, H=canvas.height*f;
      const tmp=document.createElement('canvas'); tmp.width=W; tmp.height=H;
      const t=tmp.getContext('2d'); t.imageSmoothingQuality='high'; t.drawImage(canvas,0,0,W,H);
      baseImg.src=tmp.toDataURL(); baseImg.onload=()=>{ canvas.width=W; canvas.height=H; ctx.drawImage(baseImg,0,0); snap(); };
    };
  }
};

Tools.aiColorize = {
  panel(){ return `<div class="small">Colorize B/W (stub). Untuk AI sebenarnya, kirimkan gambar ke servis colorization.</div>
  <button id="clzRun" class="primary">Colorize (Pseudo)</button>`; },
  init(){
    $('#clzRun').onclick=()=>{
      const img=getImageData(), d=img.data;
      // pseudo: deteksi grayscale → tint ringan + vibrance
      for(let i=0;i<d.length;i+=4){
        const g=0.2126*d[i]+0.7152*d[i+1]+0.0722*d[i+2];
        const tint=[1.05,1.02,0.98];
        d[i]   = clamp(g*tint[0]);
        d[i+1] = clamp(g*tint[1]);
        d[i+2] = clamp(g*tint[2]);
      }
      saturate(d, 0.18);
      putImageData(img);
    };
  }
};

Tools.tiltShift = {
  panel(){ return `
    <div class="field"><label>Kekuatan Blur</label><input id="tsAmt" type="range" min="0" max="12" value="6"></div>
    <div class="field"><label>Posisi Fokus (%)</label><input id="tsPos" type="range" min="10" max="90" value="50"></div>
    <button id="tsApply" class="primary">Apply</button>
  `; },
  init(){
    $('#tsApply').onclick=()=>{
      const a=+$('#tsAmt').value, pos=+$('#tsPos').value/100;
      const img=getImageData(), w=img.width, h=img.height;
      const blur=gaussBlur(cloneImageData(img), a);
      // blend linearly top/bottom to simulate tilt-shift
      for(let y=0;y<h;y++){
        const t = Math.abs((y/h)-pos)*2; // 0 center, 1 edges
        const mix = Math.max(0,Math.min(1,t));
        for(let x=0;x<w;x++){
          const i=(y*w+x)*4;
          img.data[i]   = lerp(img.data[i],   blur.data[i],   mix);
          img.data[i+1] = lerp(img.data[i+1], blur.data[i+1], mix);
          img.data[i+2] = lerp(img.data[i+2], blur.data[i+2], mix);
        }
      }
      putImageData(img);
    };
  }
};

Tools.hdrMerge = {
  panel(){ return `<div class="small">Dehaze / Local contrast quick pass.</div><button id="hzRun" class="primary">Apply</button>`; },
  init(){
    $('#hzRun').onclick=()=>{
      const img=getImageData();
      localContrast(img, 3, 1.2); // radius, amount
      putImageData(img);
    };
  }
};

/* ===========================================================
   UI WIRING
   =========================================================== */
let cleanup = null;
function mountPanel(html){
  $('#propFields').innerHTML = html;
}
function activateTool(id){
  if(!hasImage){ alert('Upload gambar dulu.'); return; }
  // clear previous tool listeners
  if(cleanup) try{ cleanup(); }catch(e){}
  $$('.tool').forEach(b=>b.classList.toggle('active', b.dataset.tool===id));
  currentTool = id;
  const t = Tools[id];
  mountPanel(t.panel());
  cleanup = t.init?.() || null;
  setStatus(`Tool aktif: ${id}`);
}

$$('.tool').forEach(btn=>{
  btn.addEventListener('click', ()=> activateTool(btn.dataset.tool));
});

/* Panel toggle (mobile) */
$('#toggleLeft').addEventListener('click', ()=>{
  const left = $('#left'); const right = $('#right');
  if(getComputedStyle(left).width==='0px'){ left.style.display='block'; right.style.display='block'; }
  else { left.style.display='none'; right.style.display='none'; }
});

/* Footer actions */
$('#btnUndo').onclick=undo;
$('#btnRedo').onclick=redo;
$('#btnSave').onclick=()=>alert('Disimpan di session (history).');
$('#btnCopy').onclick=async()=>{
  try{ await navigator.clipboard.writeText(canvas.toDataURL('image/png')); alert('Data URL disalin.'); }catch(e){ alert('Clipboard gagal.'); }
};

/* Export & Print */
const expSize=$('#expSize'), expW=$('#expW'), expH=$('#expH');
expSize.addEventListener('change', ()=>{
  if(expSize.value==='custom'){ expW.disabled=false; expH.disabled=false; }
  else { expW.disabled=true; expH.disabled=true; }
});
$('#btnExport').addEventListener('click', ()=>{
  if(!hasImage) return;
  const fmt=$('#expFormat').value;
  let W=canvas.width, H=canvas.height;
  const s=expSize.value;
  if(s==='custom'){ W=parseInt(expW.value||W); H=parseInt(expH.value||H); }
  else { const f=parseFloat(s); W=Math.round(W*f); H=Math.round(H*f); }
  const tmp=document.createElement('canvas'); tmp.width=W; tmp.height=H;
  const t=tmp.getContext('2d'); t.imageSmoothingQuality='high'; t.drawImage(canvas,0,0,W,H);
  const url = tmp.toDataURL(fmt, fmt==='image/jpeg'?0.92:1);
  const a=document.createElement('a'); a.href=url; a.download=`dsrt-${W}x${H}.${fmt.split('/')[1]}`; a.click();
});
$('#btnPrint').addEventListener('click', ()=>{
  const w=window.open('','_blank');
  const url = canvas.toDataURL('image/png');
  w.document.write(`<img src="${url}" style="max-width:100%;"/>`);
  w.document.close(); w.focus(); w.print();
});

/* ===========================================================
   IMAGE OPS HELPERS
   =========================================================== */
function clamp(v){ return v<0?0:(v>255?255:v) }
function clamp01(v){ return Math.max(0,Math.min(1,v)) }
function hex2rgba(hex,a){ const v=parseInt(hex.slice(1),16); const r=(v>>16)&255,g=(v>>8)&255,b=v&255; return `rgba(${r},${g},${b},${a})`; }
function cloneImageData(img){ const c=new ImageData(new Uint8ClampedArray(img.data), img.width, img.height); return c; }
function lerp(a,b,t){ return Math.round(a*(1-t)+b*t); }

function boxBlur(img, r){
  const out=cloneImageData(img);
  const {width:w,height:h,data:d}=img; const o=out.data;
  const a = (x,y,c)=>d[(y*w+x)*4+c];
  for(let y=0;y<h;y++){
    for(let x=0;x<w;x++){
      for(let c=0;c<3;c++){
        let sum=0,count=0;
        for(let yy=-r;yy<=r;yy++){
          const ny=y+yy; if(ny<0||ny>=h) continue;
          for(let xx=-r;xx<=r;xx++){
            const nx=x+xx; if(nx<0||nx>=w) continue;
            sum+=a(nx,ny,c); count++;
          }
        }
        o[(y*w+x)*4+c]=sum/count;
      }
      o[(y*w+x)*4+3]=255;
    }
  }
  return out;
}
function gaussBlur(img, r){
  // approximate gaussian by 3 passes box blur
  let o=cloneImageData(img);
  for(let i=0;i<3;i++) o=boxBlur(o, Math.max(1,Math.round(r)));
  return o;
}
function rgb2hsl(r,g,b){
  r/=255; g/=255; b/=255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b);
  let h,s,l=(max+min)/2;
  if(max===min){ h=s=0; }
  else{
    const d=max-min;
    s=l>0.5? d/(2-max-min): d/(max+min);
    switch(max){
      case r: h=(g-b)/d + (g<b?6:0); break;
      case g: h=(b-r)/d + 2; break;
      case b: h=(r-g)/d + 4; break;
    }
    h*=60;
  }
  return {h,s,l};
}
function hsl2rgb(h,s,l){
  h/=360;
  const hue2rgb=(p,q,t)=>{ if(t<0)t+=1; if(t>1)t-=1; if(t<1/6)return p+(q-p)*6*t; if(t<1/2)return q; if(t<2/3)return p+(q-p)*(2/3-t)*6; return p; };
  let r,g,b;
  if(s===0){ r=g=b=l; }
  else{
    const q=l<0.5? l*(1+s): l+s-l*s, p=2*l-q;
    r=hue2rgb(p,q,h+1/3); g=hue2rgb(p,q,h); b=hue2rgb(p,q,h-1/3);
  }
  return {r:Math.round(r*255), g:Math.round(g*255), b:Math.round(b*255)};
}
function curvesMap(data, fn){ for(let i=0;i<data.length;i+=4){ data[i]=clamp(fn(data[i])); data[i+1]=clamp(fn(data[i+1])); data[i+2]=clamp(fn(data[i+2])); } }
function tint(data, r,g,b,amt){ for(let i=0;i<data.length;i+=4){ data[i]=clamp(data[i]*(1-amt)+r*amt); data[i+1]=clamp(data[i+1]*(1-amt)+g*amt); data[i+2]=clamp(data[i+2]*(1-amt)+b*amt);} }
function contrast(data, c){ const factor=(259*(c+255))/(255*(259-c)); for(let i=0;i<data.length;i+=4){ data[i]=clamp(factor*(data[i]-128)+128); data[i+1]=clamp(factor*(data[i+1]-128)+128); data[i+2]=clamp(factor*(data[i+2]-128)+128);} }
function saturate(data, s){ // s in [-1,1]
  for(let i=0;i<data.length;i+=4){
    const r=data[i], g=data[i+1], b=data[i+2];
    const l=0.2126*r+0.7152*g+0.0722*b;
    data[i]=clamp(l + (r-l)*(1+s));
    data[i+1]=clamp(l + (g-l)*(1+s));
    data[i+2]=clamp(l + (b-l)*(1+s));
  }
}
function liftShadows(data, amt){ for(let i=0;i<data.length;i+=4){ data[i]=clamp(data[i]+amt*(1-data[i]/255)); data[i+1]=clamp(data[i+1]+amt*(1-data[i+1]/255)); data[i+2]=clamp(data[i+2]+amt*(1-data[i+2]/255)); } }
function grain(data,w,h,amp=6){
  for(let y=0;y<h;y++){
    for(let x=0;x<w;x++){
      const i=(y*w+x)*4; const n=(Math.random()*2-1)*amp;
      data[i]=clamp(data[i]+n); data[i+1]=clamp(data[i+1]+n); data[i+2]=clamp(data[i+2]+n);
    }
  }
}
function avgColor(){
  const s=64;
  const tmp=document.createElement('canvas'); tmp.width=s; tmp.height=s;
  tmp.getContext('2d').drawImage(canvas,0,0,s,s);
  const d=tmp.getContext('2d').getImageData(0,0,s,s).data;
  let r=0,g=0,b=0,count=0;
  for(let i=0;i<d.length;i+=4){ r+=d[i]; g+=d[i+1]; b+=d[i+2]; count++; }
  r=Math.round(r/count); g=Math.round(g/count); b=Math.round(b/count);
  return `rgb(${r},${g},${b})`;
}

/* ===========================================================
   INIT
   =========================================================== */
setStatus('Belum ada gambar. Klik “Buka Gambar”.');
enableEditingState(false);
</script>
</body>
</html>
