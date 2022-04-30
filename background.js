'use strict';

browser.menus.create({
	id: 'view-image-by-cihan',
	title: browser.i18n.getMessage('actionViewImage'),
	contexts: ['image']
});

browser.menus.create({
	id: 'view-video-by-cihan',
	title: browser.i18n.getMessage('actionViewVideo'),
	contexts: ['video']
});

browser.menus.onClicked.addListener(function (info, tab) {
	if (info.menuItemId !== 'view-image-by-cihan' && info.menuItemId !== 'view-video-by-cihan') {
		return;
	}

	const hasModifier = info.modifiers !== null && info.modifiers.length > 0;
	const ctrlPressed = hasModifier && info.modifiers.indexOf("Ctrl") >= 0;
	const shiftPressed = hasModifier && info.modifiers.indexOf("Shift") >= 0;

	if (info.button === 0 && !hasModifier) {
		browser.tabs.update(tab.id, {
			url: info.srcUrl
		});
	} else if (info.button === 0 && hasModifier) {
		if ((ctrlPressed && shiftPressed) || ctrlPressed) {
			browser.tabs.create({
				url: info.srcUrl,
				active: !shiftPressed,
				openerTabId: tab.id
			});
		} else if (shiftPressed) {
			browser.windows.create({
				url: [info.srcUrl],
				incognito: tab.incognito
			});
		}
	} else if (info.button === 1) {
		browser.tabs.create({
			url: info.srcUrl,
			active: true,
			openerTabId: tab.id
		});
	}
});