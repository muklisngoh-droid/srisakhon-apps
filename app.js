(function(){
  var key=document.body.getAttribute('data-app'),A=(window.APPS||{})[key]||{};
  var ua=navigator.userAgent,isIOS=/iPad|iPhone|iPod/.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  var inApp=/Line\/|FBAN|FBAV|Instagram|MicroMessenger/i.test(ua),isSafari=isIOS&&/Safari/.test(ua)&&!/CriOS|FxiOS|EdgiOS/.test(ua);
  var standalone=window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
  var dismissed=false;try{dismissed=localStorage.getItem('inst_x_'+key)==='1'}catch(e){}
  if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(function(){});
  var el=function(h){var d=document.createElement('div');d.innerHTML=h;return d.firstElementChild};
  if(!A.url){document.body.appendChild(el('<div class="load"><div><img src="icon-192.png" alt=""><b>'+(A.name||'แอป')+'</b><p>ยังไม่ได้ตั้งค่าลิงก์ของระบบนี้<br>ผู้ดูแลระบบ: ใส่ลิงก์ Web app ในไฟล์ config.js</p></div></div>'));return}
  var loader=el('<div class="load"><div><img src="icon-192.png" alt=""><b>'+A.name+'</b><div class="spin"></div><small>กำลังเปิดระบบ…</small></div></div>');document.body.appendChild(loader);
  var src=A.url+(A.url.indexOf('?')>=0?'&':'?')+'app=1';
  var f=document.createElement('iframe');f.className='frame';f.src=src;f.title=A.name;f.setAttribute('allow','clipboard-write; fullscreen');
  f.onload=function(){loader.remove()};document.body.appendChild(f);
  window.addEventListener('offline',function(){loader.querySelector('small')&&(loader.querySelector('small').textContent='ไม่มีอินเทอร์เน็ต')});
  var deferred=null,bar=null;
  function setBar(){document.documentElement.style.setProperty('--bar',bar?bar.offsetHeight+'px':'0px')}
  function showBar(btnText,onClick){if(standalone||dismissed||bar)return;
    bar=el('<div class="bar"><img src="icon-192.png" alt=""><div class="t"><b>ติดตั้ง '+A.short+'</b>เปิดเร็วจากหน้าจอโฮม เหมือนแอป</div><button type="button" class="go">'+btnText+'</button><button type="button" class="x" aria-label="ปิด">✕</button></div>');
    document.body.appendChild(bar);bar.querySelector('.go').onclick=onClick;
    bar.querySelector('.x').onclick=function(){bar.remove();bar=null;setBar();try{localStorage.setItem('inst_x_'+key,'1')}catch(e){}};setBar()}
  function sheet(h){var s=el('<div class="sheet"><div>'+h+'<button type="button">เข้าใจแล้ว</button></div></div>');document.body.appendChild(s);s.querySelector('button').onclick=function(){s.remove()};s.onclick=function(e){if(e.target===s)s.remove()}}
  window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();deferred=e;showBar('ติดตั้ง',function(){deferred.prompt();deferred.userChoice.then(function(r){if(r.outcome==='accepted'&&bar){bar.remove();bar=null;setBar()}})})});
  window.addEventListener('appinstalled',function(){if(bar){bar.remove();bar=null;setBar()}});
  if(isIOS&&!standalone){
    if(inApp||!isSafari)showBar('วิธีติดตั้ง',function(){sheet('<h3>เปิดด้วย Safari ก่อน</h3>การติดตั้งบน iPhone/iPad ต้องใช้ Safari<ol><li>แตะ ⋯ หรือปุ่มเมนู แล้วเลือก <b>เปิดในเบราว์เซอร์ / Open in Safari</b></li><li>ใน Safari แตะปุ่ม <b>แชร์</b> (สี่เหลี่ยมมีลูกศรขึ้น ⬆︎)</li><li>เลือก <b>เพิ่มไปยังหน้าจอโฮม</b> แล้วแตะ <b>เพิ่ม</b></li></ol>')});
    else showBar('วิธีติดตั้ง',function(){sheet('<h3>ติดตั้งบน iPhone / iPad</h3><ol><li>แตะปุ่ม <b>แชร์</b> ⬆︎ (ด้านล่างหรือด้านบนของ Safari)</li><li>เลื่อนลงแล้วเลือก <b>เพิ่มไปยังหน้าจอโฮม</b></li><li>แตะ <b>เพิ่ม</b> ไอคอน '+A.short+' จะอยู่บนหน้าจอโฮม</li></ol>')});
  } else if(!standalone&&inApp){showBar('วิธีติดตั้ง',function(){sheet('<h3>เปิดด้วย Chrome ก่อน</h3>แอปแชต (เช่น LINE) ติดตั้งแอปไม่ได้<ol><li>แตะ ⋮ มุมขวาบน เลือก <b>เปิดในเบราว์เซอร์อื่น / Open in Chrome</b></li><li>ใน Chrome จะมีปุ่ม <b>ติดตั้ง</b> ด้านบน หรือแตะ ⋮ → <b>ติดตั้งแอป / เพิ่มลงในหน้าจอหลัก</b></li></ol>')})}
  else setTimeout(function(){if(!deferred&&!standalone)showBar('วิธีติดตั้ง',function(){sheet('<h3>ติดตั้งเป็นแอป</h3><ol><li><b>Android (Chrome):</b> แตะ ⋮ → <b>ติดตั้งแอป</b> หรือ <b>เพิ่มลงในหน้าจอหลัก</b></li><li><b>คอมพิวเตอร์ (Chrome/Edge):</b> คลิกไอคอนติดตั้ง ⊕ ที่ช่องที่อยู่ หรือ ⋮ → <b>บันทึกและแชร์ → ติดตั้งหน้านี้เป็นแอป</b></li></ol>')})},2500);
  window.addEventListener('resize',setBar);
})();
