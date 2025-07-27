'use strict';

// אובייקט התוסף שיייצא בסוף
const User = require.main.require('./src/user');
const Groups = require.main.require('./src/groups');
const plugin = {};
plugin.addField = function(params, callback) {

	// 🟢 שדה נוסף: סוג משתתמש
	const typeProfile = { 
		label: 'סוג משתמש', 
		html: `<style>.type-profile-group{display:flex;flex-direction:column;gap:16px;direction:rtl;}.type-profile-option{border:1px solid #ccc;border-radius:8px;padding:12px 18px;display:flex;align-items:flex-start;gap:12px;cursor:pointer;transition:background .2s;position:relative;}.type-profile-option:hover{background:#f0f0f0;}.type-profile-radio{margin-top:6px;}.type-profile-info{color:#0078d4;cursor:pointer;font-size:18px;position:absolute;left:12px;top:15px;border:1px solid #ddd;border-radius:14px;padding:1px 8px;line-height:1.4;}.type-profile-desc{font-size:15px;margin-top:2px;}.type-profile-details{display:none;font-size:14px;margin-top:8px;background:#f9f9f9;border-radius:6px;padding:8px 12px;}.type-profile-option.selected .type-profile-details{display:block;}.type-profile-title{font-weight:bold;font-size:17px;margin-bottom:10px;}.type-profile-info-popup{position:absolute;z-index:10;top:15px;background:#fff;border:1px solid #ccc;border-radius:6px;padding:10px 14px;box-shadow:0 2px 8px rgba(0,0,0,0.08);font-size:14px;min-width:220px;direction:rtl;left:12px;transform:translateX(calc(-100% - 10px));}</style><div class="type-profile-title">📋 לפני שממשיכים – בחרו את סוג הרישום המתאים לכם:<br>בעל עסק / עצמאי יכול להוסיף פרופיל משני גם לאחר ההרשמה.</div><div class="type-profile-group" id="typeProfileGroup"><div style="position:relative;"><label class="type-profile-option" data-value="businessPersonalName"><input class="type-profile-radio" type="radio" name="typeProfile" value="businessPersonalName"><div><div>עצמאי / בעל עסק – רישום תחת שם פרטי</div><div class="type-profile-desc">אפשר להוסיף פרופיל עסקי בהמשך לצפייה במכרזים וקטגוריות סגורות.</div><div class="type-profile-details" id="typeProfileDetails0">רישום עם שם פרטי או שם אנונימי.<br>בהמשך תוכלו להוסיף בלחיצה אחת פרופיל עסקי נוסף – עם אפשרות פרסום משני הפרופילים והחלפה ביניהם בלחיצה.<br>הרשאות עסקיות (כמו גישה למכרזים, הצעות שיתופי פעולה, אזורים סגורים וכו’) ייפתחו רק לאחר הוספת פרופיל עסקי.</div></div></label><span class="type-profile-info" title="מידע נוסף" tabindex="0" data-info="0">🛈</span></div><div style="position:relative;"><label class="type-profile-option" data-value="business"><input class="type-profile-radio" type="radio" name="typeProfile" value="business"><div><div>עצמאי / בעל עסק – רישום תחת שם העסק</div><div class="type-profile-desc">קבלת הרשאות מיידית לצפייה והשתתפות בקטגוריות עסקיות.</div><div class="type-profile-details" id="typeProfileDetails1">רישום תחת שם העסק שלך.<br>מיד עם הרישום תיפתח גישה למכרזים, אזורים עסקיים וכלים מיוחדים.<br>ניתן גם להוסיף בהמשך פרופיל נוסף – רגיל או אנונימי – לפרסום משני שמות.</div></div></label><span class="type-profile-info" title="מידע נוסף" tabindex="0" data-info="1">🛈</span></div><div style="position:relative;"><label class="type-profile-option" data-value="private"><input class="type-profile-radio" type="radio" name="typeProfile" value="private"><div><div>אני אדם פרטי (לעת עתה...)</div><div class="type-profile-desc">ניתן לעבור בהמשך לחשבון עסקי.</div><div class="type-profile-details" id="typeProfileDetails2">התחברות רגילה כאדם פרטי.<br>תהיה לכם גישה לתוכן פתוח.<br>אם תרצו להשתתף בקטגוריות עסקיות בעתיד – ניתן לשדרג בלחיצה ולהוסיף פרופיל עסקי נוסף.</div></div></label><span class="type-profile-info" title="מידע נוסף" tabindex="0" data-info="2">🛈</span></div></div><script>(function(){const group=document.getElementById('typeProfileGroup');if(!group)return;const options=group.querySelectorAll('.type-profile-option');const radios=group.querySelectorAll('input[type="radio"][name="typeProfile"]');const infos=group.querySelectorAll('.type-profile-info');const details=group.querySelectorAll('.type-profile-details');let popup=null;let activePopupIndex=null;details.forEach(d=>d.style.display='none');infos.forEach((info,idx)=>{info.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();if(popup)popup.remove();if(activePopupIndex===idx){popup=null;activePopupIndex=null;return;}const detail=document.getElementById('typeProfileDetails'+idx);if(detail){popup=document.createElement('div');popup.className='type-profile-info-popup';popup.innerHTML=detail.innerHTML;info.parentElement.appendChild(popup);activePopupIndex=idx;document.addEventListener('mousedown',function handler(ev){if(popup&&!popup.contains(ev.target)&&ev.target!==info){popup.remove();popup=null;activePopupIndex=null;document.removeEventListener('mousedown',handler);}});}});info.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' ')info.click();});});radios.forEach((radio,idx)=>{radio.addEventListener('change',function(){options.forEach((opt,i)=>{const detail=document.getElementById('typeProfileDetails'+i);opt.classList.toggle('selected',i===idx&&radio.checked);detail.style.display=(i===idx&&radio.checked)?'block':'none';});if(popup){popup.remove();popup=null;activePopupIndex=null;}});});})();</script>`
	};

	// 🧩 הוספת השדות לתוך הטופס
	if (params.templateData.regFormEntry && Array.isArray(params.templateData.regFormEntry)) {
		params.templateData.regFormEntry.push(typeProfile);
	}

	callback(null, params);
};

plugin.checkRegister = function(params, callback) {
	// ✅ בדיקה של שדות חדשים
	if (!params.req.body['typeProfile']) {
		return callback({ source: 'typeProfile', message: 'יש לבחור את סוג הפרופיל.' }, params);
	}

	callback(null, params);
};
plugin.saveTypeProfile = async function (data) {
	if (data.data.typeProfile !== undefined) {
		await User.setUserField(data.user.uid, 'typeProfile', user.data.typeProfile);
		if (data.data.typeProfile === 'businessPersonalName') {
			await Groups.join([''], data.user.uid);
		}
		if (data.data.typeProfile === 'business') {
			await Groups.join([''], data.user.uid);
		}
		if (data.data.typeProfile === 'private') {
			await Groups.join([''], data.user.uid);
		}
	};
};
plugin.addUserFieldWhite = async ({ uids, whitelist }) => {
	whitelist.push('typeProfile');
  return { uids, whitelist };
};

module.exports = plugin;
