function Debug(obj) {
    var FinalString = "";
    for (var i = 0; i < Object.keys(obj).length; i++) {
        const KeyName = Object.keys(obj)[i];
        FinalString += (KeyName + ": " + obj[KeyName] + " ");
    }

    Cheat.PrintLog(FinalString, [255,255,255,255]);
}

Number.prototype.Clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};
String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
};

function RandInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function Pascal(s) {
    s = s.replace(/\w+/g, function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();});
    return s;
}
function RGB2HSV(RGB) {
    var result = {};

    var r = RGB[0] / 255;
    var g = RGB[1] / 255;
    var b = RGB[2] / 255;

    var minVal = Math.min(r, g, b);
    var maxVal = Math.max(r, g, b);
    var delta = maxVal - minVal;

    result.v = maxVal;

    if (delta == 0) {
        result.h = 0;
        result.s = 0;
    } else {
        result.s = delta / maxVal;
        var del_R = (((maxVal - r) / 6) + (delta / 2)) / delta;
        var del_G = (((maxVal - g) / 6) + (delta / 2)) / delta;
        var del_B = (((maxVal - b) / 6) + (delta / 2)) / delta;

        if (r == maxVal) { result.h = del_B - del_G; }
        else if (g == maxVal) { result.h = (1 / 3) + del_R - del_B; }
        else if (b == maxVal) { result.h = (2 / 3) + del_G - del_R; }

        if (result.h < 0) { result.h += 1; }
        if (result.h > 1) { result.h -= 1; }
    }

    result.h = Math.round(result.h * 360);
    result.s = Math.round(result.s * 100);
    result.v = Math.round(result.v * 100);
    result.a = RGB[3];

    return result;
}
function HSV2RGB(values) {
    var h = values[ 0 ], s = values[ 1 ], v = values[ 2 ], a = values[ 3 ];
    var r, g, b;
    var i;
    var f, p, q, t;

    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    v = Math.max(0, Math.min(100, v));

    s /= 100;
    v /= 100;

    if(s == 0) {
        r = g = b = v;
        return [
            Math.round(r * 255),
            Math.round(g * 255),
            Math.round(b * 255),
            a
        ];
    }

    h /= 60;
    i = Math.floor(h);
    f = h - i;
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));

    switch(i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;

        case 1:
            r = q;
            g = v;
            b = p;
            break;

        case 2:
            r = p;
            g = v;
            b = t;
            break;

        case 3:
            r = p;
            g = q;
            b = v;
            break;

        case 4:
            r = t;
            g = p;
            b = v;
            break;

        default: // case 5:
            r = v;
            g = p;
            b = q;
    }

    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255),
        a
    ];
}
function LerpColor(color1, color2) {
    if (Data.FPS < 8)
        return color1;
    var t = 8/Data.FPS;
    var color = [];
    color[0] = color1[0] + ((color2[0] - color1[0]) * t);
    color[1] = color1[1] + ((color2[1] - color1[1]) * t);
    color[2] = color1[2] + ((color2[2] - color1[2]) * t);
    color[3] = color1[3] + ((color2[3] - color1[3]) * t);

    return color;
}
function LerpInt(v0, v1) {
    if (Data.FPS < 8)
        return v0;
    var diff = v1 - v0;
    var maxMove = 0;
    var minDiff = 1;
    var amt = 8/Data.FPS;
	if (maxMove > 0) {
		diff = Math.min(diff, maxMove);
		diff = Math.max(diff, -maxMove);
	}
	if (Math.abs(diff) < minDiff) {
		return v1;
	}
	return v0 + diff * amt;
}
function LerpIntQuick(v0, v1) {
    if (Data.FPS < 8)
        return v0;
    var diff = v1 - v0;
    var maxMove = 0;
    var minDiff = 1;
    var amt = 0.2;
	if (maxMove > 0) {
		diff = Math.min(diff, maxMove);
		diff = Math.max(diff, -maxMove);
	}
	if (Math.abs(diff) < minDiff) {
		return v1;
	}
	return v0 + diff * amt;
}
function LerpMenu(v0, v1) {
    var diff = v1 - v0;
    var maxMove = 0;
    var minDiff = 1;
    var amt = 28/Data.FPS;
    if (amt > 1)
        amt /= 4;

	if (maxMove > 0) {
		diff = Math.min(diff, maxMove);
		diff = Math.max(diff, -maxMove);
	}
	if (Math.abs(diff) < minDiff) {
		return v1;
	}
	return v0 + diff * amt;
}
function IsDev() {
    return Data.Build == "dev";
}
function IsBeta() {
    return Data.Build == "beta";
}
function InBounds(x, y, w, h) {
    if (Data.MousePos.x >= x && Data.MousePos.x < x + w
    &&  Data.MousePos.y >= y && Data.MousePos.y < y + h)
        return true;

    return false;
}
function GetDate() {
    return new Date().toJSON().slice(2,10).replace(/-/g,'');
}

Render.BoldString = function(x, y, align, text, color, font, aacolor) {
    Render.String(x - 1, y, align, text, aacolor, font);
    Render.String(x + 1, y, align, text, aacolor, font);
    Render.String(x, y + 1, align, text, aacolor, font);
    Render.String(x, y - 1, align, text, aacolor, font);
    Render.String(x, y, align, text, color, font);
}
Render.DropShadowString = function(x, y, align, text, color, font, aacolor) {
    Render.String(x + 1, y + 1, align, text, aacolor, font);
    Render.String(x, y, align, text, color, font);
}
Render.HueRect = function( x, y, w ) {
    // declare hue spectrum colors
    const colors =
        [
            [ 255, 0, 0, 255 ],
            [ 255, 255, 0, 255 ],
            [ 0, 255, 0, 255 ],
            [ 0, 255, 255, 255 ],
            [ 0, 0, 255, 255 ],
            [ 255, 0, 255, 255 ],
            [ 255, 0, 0, 255 ]
        ];

    // loop thru the spectrum
    for ( var i = 0; i < colors.length - 1; i++ ) {
        // render each gradient
        Render.GradientRect( x + i * w / 7, y, w / 7 + 1, 10, 1, colors[ i ], colors[ i + 1 ] );
    }
}
Render.Arc = function(x, y, radius, radius_inner, start_angle, end_angle, segments, color) {
    segments = 360 / segments;

    for (var i = start_angle; i < start_angle + end_angle; i = i + segments)
    {

        var rad = i * Math.PI / 180;
        var rad2 = (i + segments) * Math.PI / 180;

        var rad_cos = Math.cos(rad);
        var rad_sin = Math.sin(rad);

        var rad2_cos = Math.cos(rad2);
        var rad2_sin = Math.sin(rad2);

        var x1_inner = x + rad_cos * radius_inner;
        var y1_inner = y + rad_sin * radius_inner;

        var x1_outer = x + rad_cos * radius;
        var y1_outer = y + rad_sin * radius;

        var x2_inner = x + rad2_cos * radius_inner;
        var y2_inner = y + rad2_sin * radius_inner;

        var x2_outer = x + rad2_cos * radius;
        var y2_outer = y + rad2_sin * radius;

        Render.Polygon( [ 
            [ x1_outer, y1_outer ],
            [ x2_outer, y2_outer ],
            [ x1_inner, y1_inner ] ],
            color
        );

        Render.Polygon( [
            [ x1_inner, y1_inner ],
            [ x2_outer, y2_outer ],
            [ x2_inner, y2_inner ] ],
            color
        );
    }
}
Render.FilledCircle3D = function (position, radius, degrees, start_at, clr, fill_clr) {
    var old_x, old_y;

    degrees = degrees < 361 && degrees || 360; degrees = degrees > -1 && degrees || 0;
    start_at += 1;

    for (rot = start_at; rot < degrees + start_at + 1; rot += start_at * 8) {
        rot_r = rot * (Math.PI / 180);
        line_x = radius * Math.cos(rot_r) + position[0], line_y = radius * Math.sin(rot_r) + position[1];

        var curr = Render.WorldToScreen([line_x, line_y, position[2]]);
        var cur = Render.WorldToScreen([position[0], position[1], position[2]]);

        if (cur[0] != null && curr[0] != null && old_x != null) {
            Render.Polygon([[curr[0], curr[1]], [old_x, old_y], [cur[0], cur[1]]], fill_clr)
            Render.Line(curr[0], curr[1], old_x, old_y, clr)
        }

        old_x = curr[0], old_y = curr[1];
    }
}
Render.Circle3D = function (position, radius, degrees, start_at, clr, fill_clr) {
    var old_x, old_y;

    degrees = degrees < 361 && degrees || 360; degrees = degrees > -1 && degrees || 0;
    start_at += 1;

    for (rot = start_at; rot < degrees + start_at + 1; rot += start_at * 8) {
        rot_r = rot * (Math.PI / 180);
        line_x = radius * Math.cos(rot_r) + position[0], line_y = radius * Math.sin(rot_r) + position[1];

        var curr = Render.WorldToScreen([line_x, line_y, position[2]]);
        var cur = Render.WorldToScreen([position[0], position[1], position[2]]);

        if (cur[0] != null && curr[0] != null && old_x != null) {
            Render.Line(curr[0], curr[1], old_x, old_y, clr)
        }

        old_x = curr[0], old_y = curr[1];
    }
}
Render.FilledTRoundRect = function(x, y, w, h, color) {
    Render.Line(x, y + h, x + w, y + h, color);
    Render.Line(x, y + 3, x, y + h, color);
    Render.Line(x + w, y + 3, x + w, y + h + 1, color);
    Render.Line(x + 3, y, x + w - 2, y, color);
    Render.FilledRect(x + 1, y + 1, w - 1, h - 1, color);
    Render.Arc(x + 3, y + 3, 3, 0, 180, 90, 12, color);
    Render.Arc(x + w - 3, y + 3, 3, 0, 270, 90, 12, color);
}
Render.TRoundRect = function(x, y, w, h, color) {
    Render.Line(x, y + h, x + w, y + h, color);//bottom
    Render.Line(x, y + 3, x, y + h, color);//left
    Render.Line(x + w, y + 3, x + w, y + h + 1, color);//right
    Render.Arc(x + 3, y + 3, 3, 2, 180, 90, 12, color);
    Render.Line(x + 3, y, x + w - 3, y, color)//top
    Render.Arc(x + w - 3, y + 3, 3, 2, 270, 90, 12, color);
}
Render.FilledRoundRect = function(x, y, w, h, color) {
    Render.Line(x + 3, y + h, x + w - 2, y + h, color);//bottom
    Render.Line(x, y + 3, x, y + h - 2, color);//left
    Render.Line(x + w, y + 3, x + w, y + h - 2, color);//right
    Render.Line(x + 3, y, x + w - 2, y, color);//top
    Render.FilledRect(x + 1, y + 1, w - 1, h - 1, color);
    Render.Arc(x + 3, y + 3, 3, 2, 180, 90, 12, color);//TL
    Render.Arc(x + w - 3, y + 3, 3, 2, 270, 90, 12, color);//TR
    Render.Arc(x + 3, y + h - 3, 3, 2, 90, 90, 12, color);//BL
    Render.Arc(x + w - 3, y + h - 3, 3, 2, 0, 90, 12, color);//BR
}
Render.CorneredRect = function(x, y, w, h, color) {
    const Length = 5;
    //top horizont
    Render.Line(x, y, x + Length, y, color);
    Render.Line((x + w) - Length, y, x + w, y, color);

    //top vert
    Render.Line(x, y, x, y + Length, color);
    Render.Line(x + w, y, x + w, y + Length, color);

    //bottom vert
    Render.Line(x, (y + h) - Length, x, y + h, color);
    Render.Line(x + w, (y + h) - Length, x + w, y + h, color);

    //bottom horizont
    Render.Line(x, y + h, x + Length, y + h, color);
    Render.Line((x + w) - Length, y + h, x + w, y + h, color);
}
/*Render.GradientRhomboid = function(x, y, w, h, style, color, color2) {
    for (var i = 0; i < h; i++) {
        Render.GradientRect(x, y, w, h, )
    }
}*/

const Keys = {
    MOUSE1: 0x01,
    MOUSE2: 0x02,
    CANCEL: 0x03,
    MOUSE3: 0x04,
    MOUSE4: 0x05,
    MOUSE5: 0x06,
    BACK: 0x08,
    TAB: 0x09,
    CLEAR: 0x0C,
    RETURN: 0x0D,
    SHIFT: 0x10,
    CTRL: 0x11,
    MENU: 0x12,
    PAUSE: 0x13,
    CAPS: 0x14,
    KANA: 0x15,
    HANGUEL: 0x15,
    HANGUL: 0x15,
    IME_ON: 0x16,
    JUNJA: 0x17,
    FINAL: 0x18,
    HANJA: 0x19,
    KANJI: 0x19,
    IME_OFF: 0x1A,
    Disabled: 0x1B,
    CONVERT: 0x1C,
    NONCONVERT: 0x1D,
    ACCEPT: 0x1E,
    MODECHANGE: 0x1F,
    SPACE: 0x20,
    PRIOR: 0x21, //30
    NEXT: 0x22,
    END: 0x23,
    HOME: 0x24,
    LEFT: 0x25,
    UP: 0x26,
    RIGHT: 0x27,
    DOWN: 0x28,
    SELECT: 0x29,
    PRINT: 0x2A,
    EXECUTE: 0x2B, //40
    SNAPSHOT: 0x2C,
    INSERT: 0x2D,
    DELETE: 0x2E,
    HELP: 0x2F,
    0: 0x30, //45
    1: 0x31,
    2: 0x32,
    3: 0x33,
    4: 0x34,
    5: 0x35, //50
    6: 0x36,
    7: 0x37,
    8: 0x38,
    9: 0x39,
    A: 0x41, //55
    B: 0x42,
    C: 0x43,
    D: 0x44,
    E: 0x45,
    F: 0x46, //60
    G: 0x47,
    H: 0x48,
    I: 0x49,
    J: 0x4A,
    K: 0x4B, //65
    L: 0x4C,
    M: 0x4D,
    N: 0x4E,
    O: 0x4F,
    P: 0x50, //70
    Q: 0x51,
    R: 0x52,
    S: 0x53,
    T: 0x54,
    U: 0x55, //75
    V: 0x56,
    W: 0x57,
    X: 0x58,
    Y: 0x59,
    Z: 0x5A, //80
    LWIN: 0x5B,
    RWIN: 0x5C,
    APPS: 0x5D,
    SLEEP: 0x5F,
    NUM0: 0x60,
    NUMP1: 0x61,
    NUM2: 0x62,
    NUM3: 0x63,
    NUM4: 0x64,
    NUM5: 0x65,
    NUM6: 0x66,
    NUM7: 0x67,
    NUM8: 0x68,
    NUM9: 0x69,
    MULTIPLY: 0x6A,
    ADD: 0x6B,
    SEPARATOR: 0x6C,
    SUBTR: 0x6D,
    DECIMAL: 0x6E,
    DIVIDE: 0x6F,
    F1: 0x70,
    F2: 0x71,
    F3: 0x72,
    F4: 0x73,
    F5: 0x74,
    F6: 0x75,
    F7: 0x76,
    F8: 0x77,
    F9: 0x78,
    F10: 0x79,
    F11: 0x7A,
    F12: 0x7B,
    F13: 0x7C,
    F14: 0x7D,
    F15: 0x7E,
    F16: 0x7F,
    F17: 0x80,
    F18: 0x81,
    F19: 0x82,
    F20: 0x83,
    F21: 0x84,
    F22: 0x85,
    F23: 0x86,
    F24: 0x87,
    NUMLCK: 0x90,
    SCROLL: 0x91,
    LSHIFT: 0xA0,
    RSHIFT: 0xA1,
    LCONTROL: 0xA2,
    RCONTROL: 0xA3,
    LMENU: 0xA4,
    RMENU: 0xA5,
    BROWSER_BACK: 0xA6,
    BROWSER_FORWARD: 0xA7,
    BROWSER_REFRESH: 0xA8,
    BROWSER_STOP: 0xA9,
    BROWSER_SEARCH: 0xAA,
    BROWSER_FAVORITES: 0xAB,
    BROWSER_HOME: 0xAC,
    VOLUME_MUTE: 0xAD,
    VOLUME_DOWN: 0xAE,
    VOLUME_UP: 0xAF,
    MEDIA_NEXT_TRACK: 0xB0,
    MEDIA_PREV_TRACK: 0xB1,
    MEDIA_STOP: 0xB2,
    MEDIA_PLAY_PAUSE: 0xB3,
    LAUNCH_MAIL: 0xB4,
    LAUNCH_MEDIA_SELECT: 0xB5,
    LAUNCH_APP1: 0xB6,
    LAUNCH_APP2: 0xB7,
    OEM_1: 0xBA,
    OEM_PLUS: 0xBB,
    OEM_COMMA: 0xBC,
    OEM_MINUS: 0xBD,
    OEM_PERIOD: 0xBE,
    OEM_2: 0xBF,
    OEM_3: 0xC0,
    OEM_4: 0xDB,
    OEM_5: 0xDC,
    OEM_6: 0xDD,
    OEM_7: 0xDE,
    OEM_8: 0xDF,
    OEM_102: 0xE2,
    PROCESSKEY: 0xE5,
    PACKET: 0xE7,
    ATTN: 0xF6,
    CRSEL: 0xF7,
    EXSEL: 0xF8,
    EREOF: 0xF9,
    PLAY: 0xFA,
    ZOOM: 0xFB,
    NONAME: 0xFC,
    PA1: 0xFD,
    OEM_CLEAR: 0xFE
}

var InputSystem = {
    Keys: [null, [false, 0]],
    LastPressedKeys: [],

    Update: function() {
        for (var i = 1; i < 255; i++) {
            InputSystem.LastPressedKeys[i] = InputSystem.Keys[i];
            InputSystem.Keys[i] = [Input.IsKeyPressed(i), Data.Time];
            
        }
    },
    IsKeyDown: function(key) {
        return this.Keys[key][0];
    },
    IsKeyPressed: function(key) {
        return this.Keys[key][0] && !this.LastPressedKeys[key][0];
    },
    IsKeyReleased: function(key) {
        return !this.Keys[key][0] && this.LastPressedKeys[key][0];
    }
};

function IsKeyActive(hotkey) {
    const Index = hotkey.id;
    const Key = hotkey.key
    const State = hotkey.state;

    if (Keys[Key] == 0x1B && State != HotkeyState.ALWAYS)
        return false;

    if (globalThis[Index] == undefined || globalThis[Index] == null)
        globalThis[Index] = false;

    switch (State) {
        case HotkeyState.DISABLED:
            return false;
        case HotkeyState.ALWAYS:
            return true;
        case HotkeyState.TOGGLE: {
            if (InputSystem.IsKeyPressed(Keys[Key]))
            if (Index == "kMenu")
                globalThis[Index] = !globalThis[Index];
            else if (!Input.IsChatOpen() && !Input.IsConsoleOpen())
                globalThis[Index] = !globalThis[Index];

            return globalThis[Index];
        } 
        case HotkeyState.HOLD:
            return InputSystem.IsKeyDown(Keys[Key]) && !Input.IsChatOpen() && !Input.IsConsoleOpen();    
        default: 
            return false;
    }
}

var Font = {
    TITLE: 0,
    ELEMENT: 0,
    DEBUG: 0,
    FOOTER: 0,
    WATERMARK: 0,
    LOGS: 0,
    INDICATORVALUE: 0,
    INDICATORTITLE: 0
}

var WindowType = {
    MAINMENU: 0,
    WATERMARK: 1
}

const ElementType = {
    CHECKBOX: 0,
    SLIDER: 1,
    DROPDOWN: 2,
    MULTIDROPDOWN: 3,
    HOTKEY: 4,
    BUTTON: 5,
    COLORPICKER: 6
}

const HotkeyState = {
    DISABLED: 0,
    ALWAYS: 1,
    TOGGLE: 2,
    HOLD: 3
}

var Config = {
    ConfigMgrVer: "1.1",
    Gui: {
        x: 120,
        y: 240
    },
    LogMgr: {
        x: 5,
        y: 5
    },

    //Aimbot->Main
    bRbot: false,
    bDtImprove: false,
    bBoostSniperRecharge: false,
    iDtDelay: 0,
    bDisDesync: false,
    bDynDtDmg: false,
    bDynRevDmg: false,
    mDynHc: "",
    mDynHcNsOptions: "",
    bJumpScout: false,
    bNsNear: false,
    iNsDist: 0,
    mHboxSafety: "",

    //Aimbot->Autowall
    bAwall: false,
    iGlobalDmg: 0,
    iAutoDmg: 0,
    iAWPDmg: 0,
    iScoutDmg: 0,

    //Aimbot->Customization
    kDmgOverride: {
        id: "kDmgOverride",
        key: "Disabled",
        state: HotkeyState.DISABLED,
        active: false
    },
    iDmgOverride: 1,
    mLogs: "",

    //Anti-Aim->Main
    bAA: false,
    kInvert: {
        id: "kInvert",
        key: "Disabled",
        state: HotkeyState.DISABLED,
        active: false
    },
    kFreestanding: {
        id: "kFreestanding",
        key: "Disabled",
        state: HotkeyState.DISABLED,
        active: false
    },
    bEPeek: false,
    bAutoInvert: false,
    bSelfLearn: false,
    bPrevHeight: false,
    iPrevHeightDist: 0,
    kMMFD: {
        id: "kMMFD",
        key: "Disabled",
        state: HotkeyState.DISABLED,
        active: false
    },
    bDisAAOnPeek: false,

    //Anti-Aim->Presets
    dAA: "",
    dFL: "",
    dPitch: "",

    //Anti-Aim->Custom
    bCustomAA: false,
    iReal: 0,
    iFake: 0,
    iLby: 0,
    bFL: false,
    iFL: 0,
    iJitter: 0,

    //Visuals->Main
    bVis: false,
    dAAA: "",
    mIndicators: "",
    mEnemyFlags: "",

    //Visuals->World
    bVisWorld: false,
    bLightningOnKill: false,
    bLightningSound: false,
    iAspectRatio: 0,

    //Visuals->Colors
    cWatermark: [16, 16, 16, 180],
    cIndicators: [243, 35, 49, 255],
    cAAA: [210, 45, 45, 255],
    cLogs: [230, 230, 230, 255],
    cAccent: [160, 40, 40, 255],

    //Misc->Main
    kMenu: {
        id: "kMenu",
        key: "HOME",
        state: HotkeyState.TOGGLE,
        active: true
    },
    kPingSpike: {
        id: "kPingSpike",
        key: "Disabled",
        state: HotkeyState.DISABLED,
        active: false
    },
    kIdealTick: {
        id: "kIdealTick",
        key: "Disabled",
        state: HotkeyState.DISABLED,
        active: false
    },
    dClan: "",

    //Misc->Configs
    sConfig: "DEFAULT",

    //Misc->Debug
    bDebugData: false,
    bDebugBounds: false,
    iShift: 16,

    //Misc->Alpha
}

var Data = {
    Build: "dev",
    Time: 0,
    FPS: 0,
    Clipboard: [],
    MousePos: {
        x: 0,
        y: 0
    },
    Resolution: {
        w: Render.GetScreenSize()[0],
        h: Render.GetScreenSize()[1] 
    },
    Update: function() {
        const _Resolution = Render.GetScreenSize();
        if (_Resolution[0] != this.Resolution.w
        || _Resolution[1] != this.Resolution.h) {
            this.Resolution = {
                w: _Resolution[0],
                h: _Resolution[1]
            };
        }

        Font.TITLE = Render.GetFont("Verdana.ttf", 14, true);
        Font.ELEMENT = Render.GetFont("Tahoma.ttf", 14, true);
        Font.DEBUG = Render.GetFont("Tahoma.ttf", 12, true);
        Font.FOOTER = Render.GetFont("Tahoma.ttf", 12, true);
        Font.WATERMARK = Render.GetFont("Verdana.ttf", 11, true);
        Font.LOGS = Render.GetFont("lucon.ttf", 12, true);
        Font.INDICATORVALUE = Render.GetFont("segoeui.ttf", 14, true);
        Font.INDICATORTITLE = Render.GetFont("segoeui.ttf", 12, true);

        const _MousePos = Input.GetCursorPosition();
        this.MousePos = {
            x: _MousePos[0],
            y: _MousePos[1]
        };
        Data.Time += Globals.Frametime();
        Data.FPS = 1/Globals.Frametime();
    }
}

const Color = {
    TEXT: {
        ELEMENT: [160, 160, 160, 255],
        ELEMENT_UNTRUSTED: [148, 141, 18, 255],
        ELEMENT_HOVERED: [210, 45, 45, 255],
        ELEMENT_DARK: [100, 100, 100, 255],
        TABS: [180, 180, 180, 255],
        TITLE: [220, 220, 220, 255],
        TITLE_ALT: [180, 180, 180, 255],
        FOOTER: [160, 160, 160, 255]
    },
    WINDOW: {
        BACKGROUND: [26, 26, 26, 230],
        HEADER: [[40, 40, 40, 255], [35, 35, 35, 255]],
        FOOTER: [[35, 35, 35, 255], [20, 20, 20, 255]],
        TAB: {
            IDLE: [55, 55, 55, 255],
            FOCUSED: [120, 50, 36, 255],
            ACTIVE: [210, 50, 36, 255]
        },
        SUBTAB: {
            IDLE: [18, 18, 18, 255],
            FOCUSED: [120, 50, 36, 255],
            FOCUSED_ALT: [18, 18, 18, 255],
            ACTIVE: [210, 50, 36, 255],
            ACTIVE_ALT: [18, 18, 18, 255],
            AREA: [24, 24, 24, 255]
        },
        GROUPBOX: {
            BACKGROUND: [16, 16, 16, 255]
        },
        CHECKBOX: {
            OUTER: [64, 64, 64, 255],
            BACKGROUND: [32, 32, 32, 255],
            IDLE: [32, 32, 32, 255],
            HOVERED: [120, 30, 35, 180],
            ACTIVE: [210, 45, 45, 255]
        },
        SLIDER: {
            OUTER: [64, 64, 64, 255],
            INNER: [32, 32, 32, 255],
            HOVERED: [210, 45, 45, 255],
            IDLE: [140, 30, 35, 255]
        },
        DROPDOWN: {
            OUTER: [64, 64, 64, 255],
            INNER: [32, 32, 32, 255],
            HOVERED: [210, 45, 45, 255]
        },
        BUTTON: {
            OUTER: [64, 64, 64, 255],
            INNER: [32, 32, 32, 255],
            HOVERED: [210, 45, 45, 255],
            CLICKED: [24, 24, 24, 255]
        },
        HOTKEY: {
            OUTER: [64, 64, 64, 255],
            INNER: [32, 32, 32, 255],
            HOVERED: [210, 45, 45, 255]
        },
        TEXTBOX: {
            OUTER: [64, 64, 64, 255],
            INNER: [32, 32, 32, 255],
            HOVERED: [210, 45, 45, 255]
        },
        COLORPICKER: {
            OUTER: [64, 64, 64, 255],
            BACKGROUND: [26, 26, 26, 255]
        }
    },
    TOOLTIP: {
        OUTER: [48, 48, 48, 0],
        INNER: [24, 24, 24, 0],
        BACKGROUND: [30, 30, 30, 0],
        TEXT: [200, 200, 200, 0]
    },
    ARROWS: {
        IDLE: [60, 60, 60, 255],
        ACTIVE: [210, 45, 45, 255]
    },
    OTHER: {
        SEPARATOR: [210, 45, 45, 255],
        LINESEPARATOR: [45, 45, 45, 255]
    }
}

const Style = {
    WINDOW: {
        w: 540,
        h: 440
    },
    HEADER: {
        h: 30
    },
    FOOTER: {
        h: 20
    },
    SEPARATOR: {
        h: 2
    },
    SUBTABAREA: {
        w: 140
    },
    SUBTAB: {
        h: 48
    }
}

var Tooltip = {
    render: false,  
    text: "",
    alpha: 0
}

function CWindow(w, h, name, type, footer) {
    this.x = Config.Gui.x;
    this.y = Config.Gui.y;
    this.w = w;
    this.h = h;
    this.name = name;
    this.type = type;
    this.footer = footer;

    this.closed = false;

    this.mousedelta = [0, 0];
    this.dragging = false;

    this.resizedelta = [0, 0];
    this.resizing = false;

    this.tabs = [];
    this.activetab = "";

    this.Handle = function() {

        this.dragging = (!this.closed && (InputSystem.IsKeyPressed(1) 
        && InputSystem.IsKeyDown(1) && InBounds(this.x, this.y, 165, Style.HEADER.h)
        || InputSystem.IsKeyDown(1) && this.dragging));

        if (Config.kMenu.active) {
            Input.ForceCursor(0)
            if (this.w != 0)
                this.w = LerpMenu(this.w, 0);
            if (this.h != 0)
                this.h = LerpMenu(this.h, 0);
            if (this.h <= 0 && this.w <= 0) {
                this.closed = true;
                this.h = 0;
                this.w = 0;
            }
        } else {
            Input.ForceCursor(1);
            if(this.w != w)
                this.w = LerpMenu(this.w, w);
            if (this.h != h)
                this.h = LerpMenu(this.h, h);
            if (this.w > w)
                this.w = w;
            if (this.h > h)
                this.h = h;

            if (this.w != w && this.h != h)
                this.closed = false;
        }

        if (this.closed)
            return;

        if (this.dragging) {
            this.x = Data.MousePos.x - this.mousedelta[0];
            this.y = Data.MousePos.y - this.mousedelta[1];
        } else {
            this.mousedelta[0] = Data.MousePos.x - this.x;
            this.mousedelta[1] = Data.MousePos.y - this.y;
        }

        if (this.x <= 0)
            this.x = 0;
        if (this.x + this.w >= Data.Resolution.w)
            this.x = Data.Resolution.w - this.w;
        if (this.y <= 0)
            this.y = 0;
        if (this.y + this.h >= Data.Resolution.h)
            this.y = Data.Resolution.h - this.h;

        if (!this.activetab.length) {
            this.activetab = this.tabs[0].name;
            this.tabs[0].color = [Config.cAccent[0], Config.cAccent[1], Config.cAccent[2], 200];
        }

        Config.Gui.x = this.x;
        Config.Gui.y = this.y;

        this.Render();
    }

    this.Render = function() {
        if (this.closed)
            return;

        Render.FilledRect(this.x, this.y, this.w, this.h, Color.WINDOW.BACKGROUND);
        Render.GradientRect(this.x, this.y, this.w, Style.HEADER.h, 0, Color.WINDOW.HEADER[0], Color.WINDOW.HEADER[1]);
        Render.FilledRect(this.x, this.y + Style.HEADER.h, this.w, Style.SEPARATOR.h, Config.cAccent);

        const TitleSize = Render.TextSize(this.name, Font.TITLE);
        if (this.w >= TitleSize[0] + 14)
            Render.BoldString(this.x + 9, this.y + 5, 0, this.name, Color.TEXT.TITLE, Font.TITLE, Color.TEXT.TITLE_ALT)

        if (this.h - Style.HEADER.h >= Style.FOOTER.h){
            Render.Line(this.x, this.y + this.h - Style.FOOTER.h - 1, this.x + this.w, this.y + this.h - Style.FOOTER.h - 1, Color.OTHER.LINESEPARATOR);
            Render.GradientRect(this.x, this.y + this.h - Style.FOOTER.h, this.w, Style.FOOTER.h, 0, Color.WINDOW.FOOTER[0], Color.WINDOW.FOOTER[1]);

            const Footer = un();
            const FooterSize = Render.TextSize(Footer, Font.FOOTER);
            if (this.w >= FooterSize[0] + 5)
                Render.String(this.x + 5, this.y + this.h - Style.FOOTER.h + 2, 0, Footer, Color.TEXT.FOOTER, Font.FOOTER);
        }

        if (this.w <= Style.SUBTABAREA.w)
            return;

        Render.FilledRect(this.x, this.y + Style.HEADER.h + Style.SEPARATOR.h, Style.SUBTABAREA.w, this.h - Style.HEADER.h - Style.SEPARATOR.h - Style.FOOTER.h - 1, Color.WINDOW.SUBTAB.AREA);
        Render.Line(this.x + Style.SUBTABAREA.w, this.y + Style.HEADER.h + Style.SEPARATOR.h, this.x + Style.SUBTABAREA.w, this.y + this.h - Style.FOOTER.h - 1, Color.OTHER.LINESEPARATOR);
    }

    this.CTab = function(parent, name) {
        this.parent = parent;
        this.name = name;
        this.color = Color.WINDOW.TAB.IDLE;
        this.active = false;
        this.subtabs = [];
        this.activesubtab = "";
        this.bounds = {
            w: 80,
            h: 23
        }

        this.Handle = function(Position) {
            if (InputSystem.IsKeyPressed(1) && InBounds(Position, this.parent.y + 6, this.bounds.w, this.bounds.h + 1))
                parent.activetab = this.name;

            this.active = parent.activetab == this.name;

            if (this.active)
                this.color = LerpColor(this.color, Config.cAccent);
            else if (InBounds(Position, this.parent.y + 6, this.bounds.w, this.bounds.h + 1))
                this.color = LerpColor(this.color, [Config.cAccent[0], Config.cAccent[1], Config.cAccent[2], 200]);
            else
                this.color = LerpColor(this.color, Color.WINDOW.TAB.IDLE);

            if (!this.activesubtab.length) {
                this.activesubtab = this.subtabs[0].name;
                this.subtabs[0].color = [Config.cAccent, Color.WINDOW.SUBTAB.ACTIVE_ALT];
            }    

            if (!(this.parent.w < (Position + this.bounds.w) - this.parent.x))
                this.Render(Position);

            for (var i = 0; i < this.subtabs.length; i++) {
                if (!this.active)
                    break;

                const Subtab = this.subtabs[i];
                const Position = this.parent.y + Style.HEADER.h + Style.SEPARATOR.h + i*48;
                Subtab.Handle(Position);
            }
        }

        this.Render = function(Position) {
            Render.FilledTRoundRect(Position, this.parent.y + (this.active ? 4 : 6), this.bounds.w, this.bounds.h + (this.active ? 2 : 0), this.color);
            const TextSize = Render.TextSize(this.name, Font.ELEMENT);
            Render.DropShadowString(Position + this.bounds.w/2 - TextSize[0]/2, this.parent.y + 9, 0, this.name, Color.TEXT.TABS, Font.ELEMENT, [0,0,0,255]);    
        }
    }
    this.AddTab = function(name) {
        this.tabs.push(new this.CTab(this, name))
    }

    this.CSubtab = function(parent, window, name) {
        this.parent = parent;
        this.window = window;
        this.name = name;
        this.color = [Color.WINDOW.SUBTAB.IDLE, Color.WINDOW.SUBTAB.IDLE];
        this.active = false;
        this.groupboxes = [];
        this.categories = [];
        this.bounds = {
            w: Style.SUBTABAREA.w,
            h: Style.SUBTAB.h
        }
        
        this.Handle = function(Position) {
            if (InputSystem.IsKeyPressed(1) && InBounds(this.window.x, Position, Style.SUBTABAREA.w, Style.SUBTAB.h, this.bounds.h))
                parent.activesubtab = this.name;

            this.active = parent.activesubtab == this.name;

            if (this.active)
                this.color = [LerpColor(this.color[0], Config.cAccent), LerpColor(this.color[1], Color.WINDOW.SUBTAB.ACTIVE_ALT)];
            else if (InBounds(this.window.x, Position, Style.SUBTABAREA.w, Style.SUBTAB.h) && !this.parent.dragging)
                this.color = [LerpColor(this.color[0], [Config.cAccent[0], Config.cAccent[1], Config.cAccent[2], 100]), LerpColor(this.color[1], Color.WINDOW.SUBTAB.FOCUSED_ALT)];
            else
                this.color = [LerpColor(this.color[0], Color.WINDOW.SUBTAB.IDLE), LerpColor(this.color[1], Color.WINDOW.SUBTAB.IDLE)];

            for (var i = 0; i < this.groupboxes.length; i++) {
                if (!this.active)
                    break;

                const Groupbox = this.groupboxes[i];
                Groupbox.Handle();
            }

            if (this.window.y + this.window.h <= this.bounds.h + Position || this.window.w <= this.bounds.w)
                return;

            this.Render(Position);
        }

        this.Render = function(Position) {
            Render.GradientRect(this.window.x, Position, Style.SUBTABAREA.w, Style.SUBTAB.h, 1, this.color[0], this.color[1])
            //Render.Rect(this.window.x, Position, Style.SUBTABAREA.w, Style.SUBTAB.h, [23, 23, 23, 255]);
            Render.Line(this.window.x, Position + Style.SUBTAB.h - 1, this.window.x + Style.SUBTABAREA.w, Position + Style.SUBTAB.h - 1, Color.OTHER.LINESEPARATOR);
            
            const TextSize = Render.TextSize(this.name, Font.ELEMENT);
            Render.DropShadowString(this.window.x + Style.SUBTABAREA.w/2 - TextSize[0]/2, Position + Style.SUBTAB.h/2 - TextSize[1]/2 - 2, 0, this.name, Color.TEXT.TABS, Font.ELEMENT, [0,0,0,255]);
        }
    }
    this.AddSubtab = function(parent, name) {
        for (var i = 0; i < this.tabs.length; i++) {
            const Tab = this.tabs[i];

            if (Tab.name == parent)
                Tab.subtabs.push(new this.CSubtab(Tab, this, name));
        }
    }

    this.CGroupbox = function(parent, window) {
        this.parent = parent;
        this.window = window;
        this.features = [];
        this.pos = {
            x: 0,
            y: 0
        }
        this.bounds = {
            w: window.w - Style.SUBTABAREA.w - 42,
            h: window.h - Style.HEADER.h + Style.SEPARATOR.h - Style.FOOTER.h - 46
        }

        this.Handle = function() {
            this.pos.x = this.window.x + Style.SUBTABAREA.w + 21;
            this.pos.y = this.window.y + Style.HEADER.h + Style.SEPARATOR.h + 20;

            if (this.window.h <= this.bounds.h + Style.HEADER.h + Style.SEPARATOR.h + 20 || this.window.w <= this.bounds.w + Style.SUBTABAREA.w + 21)
                return;

            this.Render();

            for (var i = 0; i < this.features.length; i++) {
                const Feature = this.features[i];
                const LastFeature = this.features[i - 1];
                const Position = this.pos.y + 12 + (i == 0 ? i*24 : (LastFeature.pos.y - this.pos.y) + LastFeature.bounds.h);
                
                Feature.Handle(Position);

                if (IsDev() && Config.bDebugBounds)
                    Render.Rect(Feature.pos.x - 1, Feature.pos.y - 1, Feature.bounds.w + 2, Feature.bounds.h + 2, [255,255,255,160])
            }
        }

        this.AddCheckbox = function(name, id, tooltip, untrusted) {
            this.features.push(new window.CCheckbox(this, name, id, tooltip, untrusted));
            return this;
        }

        this.AddSlider = function(name, id, tooltip, min, max) {
            this.features.push(new window.CSlider(this, name, id, tooltip, min, max));
            return this;
        }

        this.AddDropdown = function(name, id, tooltip, options, untrusted) {
            this.features.push(new window.CDropdown(this, name, id, tooltip, options, untrusted));
            return this;
        }

        this.AddMultiDropdown = function(name, id, tooltip, options) {
            this.features.push(new window.CMultiDropdown(this, name, id, tooltip, options));
            return this;
        }

        this.AddButton = function(name, callback) {
            this.features.push(new window.CButton(this, name, callback));
            return this;
        }

        this.AddHotkey = function(name, id, tooltip) {
            this.features.push(new window.CHotkey(this, name, id, tooltip));
            return this;
        }

        this.AddTextbox = function(name, id) {
            this.features.push(new window.CTextbox(this, name, id));
            return this;
        }

        this.AddColorPicker = function(name, id) {
            this.features.push(new window.CColorPicker(this, name, id));
            return this;
        }

        this.Render = function() {
           Render.FilledRoundRect(this.pos.x, this.pos.y, this.bounds.w, this.bounds.h, Color.WINDOW.GROUPBOX.BACKGROUND);
        }
    }
    this.AddGroupbox = function(tab, parent) {
        for (var i = 0; i < this.tabs.length; i++) {
            const Tab = this.tabs[i];

            if (Tab.name == tab) {
                for (var j = 0; j < Tab.subtabs.length; j++) {
                    const Subtab = Tab.subtabs[j];

                    if (Subtab.name == parent) {
                        const _Groupbox = new this.CGroupbox(parent, this);
                        Subtab.groupboxes.push(_Groupbox);
                        return _Groupbox;
                    }
                }
            }
        }
    }

    this.CCheckbox = function(parent, name, id, tooltip, untrusted) {
        this.parent = parent;
        this.name = name;
        this.id = id;
        this.tooltip = tooltip;
        this.untrusted = untrusted || false;
        this.hovered = false;
        this.hovertime = 0;
        this.active = false;
        this.color = Color.WINDOW.CHECKBOX.IDLE;
        this.pos = {
            x: 0,
            y: 0
        }
        this.size = {
            w: 14,
            h: 14
        }
        this.bounds = {
            w: 0,
            h: 0
        }

        this.Handle = function(Position) {
            this.pos = {
                x: this.parent.pos.x + 20,
                y: Position
            }
            const TextSize = Render.TextSize(this.name, Font.ELEMENT);
            this.bounds = {
                w: this.size.w + TextSize[0] + 10,
                h: this.size.h
            }

            if (this.pos.y + this.bounds.h > this.parent.pos.y + this.parent.bounds.h)
                return;

            this.hovered = InBounds(this.pos.x, this.pos.y, this.bounds.w, this.bounds.h);

            if (this.hovered) {
                this.hovertime += Globals.Frametime();
                if (this.hovertime > 0.75) {
                    Tooltip.render = true;
                    Tooltip.text = this.tooltip;
                }

                if (InputSystem.IsKeyPressed(1))
                    Config[this.id] = !Config[this.id];
            } else {
                this.hovertime = 0;
            }

            this.active = Config[this.id];

            if (this.active)
                this.color = LerpColor(this.color, Config.cAccent);
            else if (!this.active && this.hovered)
                this.color = LerpColor(this.color, [Config.cAccent[0], Config.cAccent[1], Config.cAccent[2], 120]);
            else
                this.color = LerpColor(this.color, Color.WINDOW.CHECKBOX.IDLE);

            this.Render();
        }

        this.Render = function() {
            Render.Rect(this.pos.x, this.pos.y, this.size.w, this.size.h, Color.WINDOW.CHECKBOX.OUTER);
            Render.FilledRect(this.pos.x + 1, this.pos.y + 1, this.size.w - 2, this.size.h - 2, Color.WINDOW.CHECKBOX.BACKGROUND);
            Render.String(this.pos.x + this.size.w + 10, this.pos.y - 1, 0, this.name, this.untrusted ? Color.TEXT.ELEMENT_UNTRUSTED : Color.TEXT.ELEMENT, Font.ELEMENT)

            Render.Line(this.pos.x + 3, this.pos.y + 7, this.pos.x + 5, this.pos.y + 9, this.color);       
            Render.Line(this.pos.x + 5, this.pos.y + 9, this.pos.x + 11, this.pos.y + 3, this.color);
            Render.Line(this.pos.x + 6, this.pos.y + 9, this.pos.x + 11, this.pos.y + 4, this.color);
            Render.Line(this.pos.x + 3, this.pos.y + 6, this.pos.x + 6, this.pos.y + 9, this.color);
        }
    }

    this.CSlider = function(parent, name, id, tooltip, min, max) {
        this.parent = parent;
        this.name = name;
        this.id = id;
        this.tooltip = tooltip;
        this.min = min;
        this.max = max;
        this.hovered = false;
        this.hovertime = 0;
        this.dragging = false;
        this.rendervalue = 0;
        this.color = [Config.cAccent[0], Config.cAccent[1], Config.cAccent[2], 120];
        this.pos = {
            x: 0,
            y: 0
        }
        this.sliderpos = {
            x: 0,
            y: 0
        }
        this.size = {
            w: this.parent.bounds.w - 40,
            h: 13
        }
        this.bounds = {
            w: 0,
            h: 0
        }

        this.Handle = function(Position) {
            this.pos = {
                x: this.parent.pos.x + 20,
                y: Position
            }
            this.sliderpos = {
                x: this.pos.x,
                y: this.name.length ? this.pos.y + 24 : this.pos.y
            }
            const TextSize = Render.TextSize(this.name, Font.ELEMENT);
            this.bounds = {
                w: this.size.w + 1,
                h: (this.name.length ? TextSize[1] + 11 : 0) + this.size.h
            }

            if (this.pos.y + this.bounds.h > this.parent.pos.y + this.parent.bounds.h)
                return;

            const Fraction = (Config[this.id] - this.min) / (this.max - this.min);
            this.rendervalue = Fraction * this.size.w - 2;

            this.hovered = InBounds(this.pos.x, this.sliderpos.y, this.size.w, this.size.h + 1);
            this.dragging = ((this.hovered || !this.hovered && this.dragging) && (InputSystem.IsKeyPressed(1) && InputSystem.IsKeyDown(1) || this.dragging && InputSystem.IsKeyDown(1)));

            if (this.dragging) {
                this.rendervalue = (Data.MousePos.x - this.pos.x).Clamp(0, this.size.w - 2);
                Config[this.id] = Math.round(this.rendervalue * ((this.max - this.min) / (this.size.w - 2)) + this.min);
            }

            Config[this.id] = Config[this.id].Clamp(min, max);

            if (this.rendervalue <= 5)
                this.rendervalue = 5;

            if (this.dragging || this.hovered) {
                this.color = LerpColor(this.color, Config.cAccent);
                Tooltip.render = true;
                Tooltip.text = this.tooltip.format(Config[this.id]);
            }
            else
                this.color = LerpColor(this.color, [Config.cAccent[0], Config.cAccent[1], Config.cAccent[2], 120]);

            this.Render();
        }

        this.Render = function() {
            Render.String(this.pos.x, this.pos.y, 0, this.name, Color.TEXT.ELEMENT, Font.ELEMENT);
            Render.FilledRoundRect(this.pos.x, this.sliderpos.y, this.size.w, this.size.h, Color.WINDOW.SLIDER.OUTER)
            Render.FilledRoundRect(this.pos.x + 1, this.sliderpos.y + 1, this.size.w - 2, this.size.h - 2, Color.WINDOW.SLIDER.INNER)
            Render.FilledRoundRect(this.pos.x + 1, this.sliderpos.y + 1, this.rendervalue, this.size.h - 2, this.color)
        }
    }

    this.CDropdown = function(parent, name, id, tooltip, options, untrusted) {
        this.parent = parent;
        this.name = name;
        this.id = id;
        this.tooltip = tooltip;
        this.options = options;
        this.untrusted = untrusted || false;
        this.hovered = false;
        this.hovertime = 0;
        this.opened = false;
        this.progress = 1;
        this.color = Color.WINDOW.DROPDOWN.OUTER;
        this.textcolor = Color.TEXT.ELEMENT;
        this.pos = {
            x: 0,
            y: 0
        }
        this.dropdownpos = {
            x: 0,
            y: 0
        }
        this.size = {
            w: this.parent.bounds.w - 40,
            h: 29
        }
        this.bounds = {
            w: 0,
            h: 0
        }

        this.Handle = function(Position) {
            this.pos = {
                x: this.parent.pos.x + 20,
                y: Position
            }
            this.dropdownpos = {
                x: this.pos.x,
                y: Position + (this.name.length ? 24 : 0)
            }
            const TextSize = Render.TextSize(this.name, Font.ELEMENT);
            this.bounds = {
                w: this.size.w + 1,
                h: (this.name.length ? TextSize[1] + 10 : 0) + this.size.h + (this.opened ? this.progress - 1 : this.progress)
            }

            if (((this.pos.y + this.size.h + 20) > this.parent.pos.y + this.parent.bounds.h))
                return;

            if (!Config[this.id].length)
                Config[this.id] = "Disabled";

            this.hovered = InBounds(this.pos.x, this.dropdownpos.y, this.size.w + 1, this.size.h + 1);

            if (this.hovered) {
                this.hovertime += Globals.Frametime();
                if (this.hovertime > 0.75) {
                    Tooltip.render = true;
                    Tooltip.text = this.tooltip;
                }

                if (InputSystem.IsKeyPressed(1))
                    this.opened = !this.opened;
            } else
                this.hovertime = 0;

            this.progress = (this.opened ? LerpInt(this.progress, this.size.h * this.options.length) : this.progress = LerpInt(this.progress, 0));

            if (this.hovered || this.opened) {
                this.color = LerpColor(this.color, Config.cAccent);
                //this.textcolor = LerpColor(this.textcolor, Color.TEXT.ELEMENT);
            }
            else {
                this.color = LerpColor(this.color, Color.WINDOW.DROPDOWN.OUTER);
                //this.textcolor = LerpColor(this.textcolor, Color.TEXT.ELEMENT_DARK);
            }

            this.Render();
        }

        this.Render = function() {
            Render.String(this.pos.x, this.pos.y, 0, this.name, this.untrusted ? Color.TEXT.ELEMENT_UNTRUSTED : Color.TEXT.ELEMENT, Font.ELEMENT);

            if (this.opened || this.progress > 0) {
                Render.FilledRect(this.pos.x + 1, this.dropdownpos.y + this.size.h, this.size.w - 1, this.progress, Color.WINDOW.DROPDOWN.INNER)

                if (!InBounds(this.pos.x + 1, this.dropdownpos.y, this.size.w - 1, this.progress + this.size.h) && InputSystem.IsKeyPressed(1))
                    this.opened = false;

                for (var i = 0; i < this.options.length; i++) {
                    const Position = 5 + this.dropdownpos.y + this.size.h + i*this.size.h;
                    if (this.dropdownpos.y + this.size.h + this.progress - 15 > Position) {
                        const Option = this.options[i];
                        var OptionHovered = InBounds(this.pos.x + 1, Position, this.size.w - 1, 20);

                        if (InputSystem.IsKeyPressed(1)) {
                            if (OptionHovered)
                                Config[this.id] = Option;

                            this.opened = false;
                        }
                            
                        Render.String(this.pos.x + 10, Position, 0, Option, (OptionHovered || Config[this.id] == Option) ? Config.cAccent : Color.TEXT.ELEMENT, Font.ELEMENT);
                    }
                }
            }

            Render.FilledRoundRect(this.pos.x, this.dropdownpos.y, this.size.w, this.size.h, this.color)
            Render.FilledRoundRect(this.pos.x + 1, this.dropdownpos.y + 1, this.size.w - 2, this.size.h - 2, Color.WINDOW.DROPDOWN.INNER)
            var Text = Config[this.id]
            const TextSize = Render.TextSize(Text, Font.ELEMENT);
            
            while (TextSize[0] >= this.size.w - 20) {
                Text = Text.substring(0, Text.length - 4) + "...";
                TextSize = Render.TextSize(Text, Font.ELEMENT);
            }
            Render.String(this.pos.x + 10, this.dropdownpos.y + 6, 0, Text, this.textcolor, Font.ELEMENT);
        }
    }

    this.CMultiDropdown = function(parent, name, id, tooltip, options) {
        this.parent = parent;
        this.name = name;
        this.id = id;
        this.tooltip = tooltip;
        this.options = options;
        this.hovered = false;
        this.hovertime = 0;
        this.opened = false;
        this.progress = 1;
        this.color = Color.WINDOW.DROPDOWN.OUTER;
        this.textcolor = Color.TEXT.ELEMENT;
        this.pos = {
            x: 0,
            y: 0
        }
        this.dropdownpos = {
            x: 0,
            y: 0
        }
        this.size = {
            w: this.parent.bounds.w - 40,
            h: 29
        }
        this.bounds = {
            w: 0,
            h: 0
        }

        this.Handle = function(Position) {
            this.pos = {
                x: this.parent.pos.x + 20,
                y: Position
            }
            this.dropdownpos = {
                x: this.pos.x,
                y: Position + (this.name.length ? 24 : 0)
            }
            const TextSize = Render.TextSize(this.name, Font.ELEMENT);
            this.bounds = {
                w: this.size.w + 1,
                h: (this.name.length ? TextSize[1] + 10 : 0) + this.size.h + (this.opened ? this.progress - 1 : this.progress)
            }

            if (((this.pos.y + this.size.h + 20) > this.parent.pos.y + this.parent.bounds.h))
                return;

            this.hovered = InBounds(this.pos.x, this.dropdownpos.y, this.size.w + 1, this.size.h + 1);

            if (this.hovered) {
                this.hovertime += Globals.Frametime();
                if (this.hovertime > 0.75) {
                    Tooltip.render = true;
                    Tooltip.text = this.tooltip;
                }

                if (InputSystem.IsKeyPressed(1))
                    this.opened = !this.opened;
            } else {
                this.hovertime = 0;
            }

            this.progress = (this.opened ? LerpInt(this.progress, this.size.h * this.options.length) : this.progress = LerpInt(this.progress, 0));

            if (this.hovered || this.opened) {
                this.color = LerpColor(this.color, Config.cAccent);
                //this.textcolor = LerpColor(this.textcolor, Color.TEXT.ELEMENT);
            }
            else {
                this.color = LerpColor(this.color, Color.WINDOW.DROPDOWN.OUTER);
                //this.textcolor = LerpColor(this.textcolor, Color.TEXT.ELEMENT_DARK);
            }

            this.Render();
        }

        this.Render = function() {
            Render.String(this.pos.x, this.pos.y, 0, this.name, Color.TEXT.ELEMENT, Font.ELEMENT);

            if (this.opened || this.progress > 0) {
                Render.FilledRect(this.pos.x + 1, this.dropdownpos.y + this.size.h, this.size.w - 1, this.progress, Color.WINDOW.DROPDOWN.INNER)

                if (!InBounds(this.pos.x + 1, this.dropdownpos.y, this.size.w - 1, this.progress + this.size.h) && InputSystem.IsKeyPressed(1))
                    this.opened = false;

                for (var i = 0; i < this.options.length; i++) {
                    const Position = 5 + this.dropdownpos.y + this.size.h + i*this.size.h;
                    if (this.dropdownpos.y + this.size.h + this.progress - 15 > Position) {
                        const Option = this.options[i];
                        var OptionHovered = InBounds(this.pos.x + 1, Position, this.size.w - 1, 20);

                        if (OptionHovered && InputSystem.IsKeyPressed(1)) {
                            if (!Config[this.id].includes(Option)) {
                                Config[this.id] += (Config[this.id].length > 0 ? ", " : "") + Option;
                            } else {
                                Config[this.id] = Config[this.id].replace(", " + Option, "");
                                Config[this.id] = Config[this.id].replace(Option + ", ", "");
                                Config[this.id] = Config[this.id].replace(Option, "");
                            }
                        }
                            
                        Render.String(this.pos.x + 10, Position, 0, Option, (OptionHovered || Config[this.id].includes(Option)) ? Config.cAccent : Color.TEXT.ELEMENT, Font.ELEMENT);
                    }
                }
            }

            Render.FilledRoundRect(this.pos.x, this.dropdownpos.y, this.size.w, this.size.h, this.color)
            Render.FilledRoundRect(this.pos.x + 1, this.dropdownpos.y + 1, this.size.w - 2, this.size.h - 2, Color.WINDOW.DROPDOWN.INNER)
            var Text = Config[this.id].length > 0 ? Config[this.id] : "Disabled";
            const TextSize = Render.TextSize(Text, Font.ELEMENT);
            
            while (TextSize[0] >= this.size.w - 20) {
                Text = Text.substring(0, Text.length - 4) + "...";
                TextSize = Render.TextSize(Text, Font.ELEMENT);
            }
            Render.String(this.pos.x + 10, this.dropdownpos.y + 6, 0, Text, this.textcolor, Font.ELEMENT);
        }
    }

    this.CButton = function(parent, name, callback) {
        this.parent = parent;
        this.name = name;
        this.callback = callback;
        this.hovered = false;
        this.color = Color.WINDOW.BUTTON.OUTER;
        this.innercolor = Color.WINDOW.BUTTON.INNER
        this.pos = {
            x: 0,
            y: 0
        }
        this.size = {
            w: this.parent.bounds.w - 40,
            h: 31
        }
        this.bounds = {
            w: 0,
            h: 0
        }

        this.Handle = function(Position) {
            this.pos = {
                x: this.parent.pos.x + 20,
                y: Position
            }
            this.bounds = {
                w: this.size.w + 1, 
                h: this.size.h + 1
            }

            if (this.pos.y + this.bounds.h > this.parent.pos.y + this.parent.bounds.h)
                return;

            this.hovered = InBounds(this.pos.x, this.pos.y, this.size.w, this.size.h + 1);

            if (this.hovered && InputSystem.IsKeyPressed(1)) {
                callback()
                this.innercolor = Color.WINDOW.BUTTON.CLICKED;
            }
            else if (this.hovered && InputSystem.IsKeyDown(1)) {
                this.innercolor = Color.WINDOW.BUTTON.CLICKED;
            }
            else
                this.innercolor = Color.WINDOW.BUTTON.INNER;

            this.color = this.hovered ? LerpColor(this.color, Config.cAccent) : LerpColor(this.color, Color.WINDOW.BUTTON.OUTER);

            this.Render();
        }

        this.Render = function() {
            Render.FilledRoundRect(this.pos.x, this.pos.y, this.size.w, this.size.h, this.color)
            Render.FilledRoundRect(this.pos.x + 1, this.pos.y + 1, this.size.w - 2, this.size.h - 2, this.innercolor)
            const TextSize = Render.TextSize(this.name, Font.ELEMENT);
            Render.String(this.pos.x + 1 + this.size.w/2 - TextSize[0]/2, this.pos.y + 7, 0, this.name, Color.TEXT.ELEMENT, Font.ELEMENT);
        }
    }

    this.CHotkey = function(parent, name, id, tooltip) {
        this.parent = parent;
        this.name = name;
        this.id = id;
        this.tooltip = tooltip;
        this.hovered = false;
        this.hoveredstatearea = false;
        this.listening = false;
        this.changingstate = false;
        this.color = Color.WINDOW.HOTKEY.OUTER;
        this.pos = {
            x: 0,
            y: 0
        }
        this.hotkeypos = {
            x: 0,
            y: 0
        }
        this.size = {
            w: 58,
            h: 24
        }
        this.stateareasize = {
            w: 72,
            h: 80
        }
        this.bounds = {
            w: 0,
            h: 0
        }

        this.Handle = function(Position) {
            this.pos = {
                x: this.parent.pos.x + 20,
                y: Position
            }
            this.hotkeypos = {
                x: this.parent.pos.x + this.parent.bounds.w - this.size.w - 20,
                y: Position
            }
            this.bounds = {
                w: (this.hotkeypos.x + this.size.w + 1) - this.pos.x, 
                h: this.size.h + 1
            }

            if (this.hotkeypos.y + this.bounds.h > this.parent.pos.y + this.parent.bounds.h)
                return;

            this.hovered = InBounds(this.hotkeypos.x, this.hotkeypos.y, this.size.w, this.bounds.h);
            this.hoveredstatearea = this.changingstate ? InBounds(this.parent.pos.x + this.parent.bounds.w + 31, this.hotkeypos.y, this.stateareasize.w, this.stateareasize.h) : false;

            if (this.hovered) {
                this.hovertime += Globals.Frametime();
                if (this.hovertime > 0.75) {
                    Tooltip.render = true;
                    Tooltip.text = this.tooltip;
                }
            } else {
                this.hovertime = 0;
                if (this.listening && InputSystem.IsKeyPressed(1))
                    this.listening = false;
            }

            if (this.hovered) {
                if (InputSystem.IsKeyPressed(2) && !this.listening)
                    this.changingstate = !this.changingstate;

                if (InputSystem.IsKeyPressed(1) && !this.listening)
                    this.listening = true;
            } else {
                if (InputSystem.IsKeyPressed(2))
                    this.changingstate = false;
            }

            if (this.hovered || this.changingstate)
                this.color = LerpColor(this.color, Config.cAccent);
            else
                this.color = LerpColor(this.color, Color.WINDOW.HOTKEY.OUTER);

            if (this.listening) {
                for (var i in Keys) {
                    if (InputSystem.IsKeyPressed(Keys[i]) && !InputSystem.IsKeyPressed(1)) {
                        Config[this.id].key = i.toString();
                        this.listening = false; 
                    }
                }
            }

            if (this.changingstate && !this.hoveredstatearea && InputSystem.IsKeyPressed(1))
                this.changingstate = false;

            this.Render();
        }

        this.Render = function() {
            Render.FilledRoundRect(this.hotkeypos.x, this.hotkeypos.y, this.size.w, this.size.h, this.color)
            Render.FilledRoundRect(this.hotkeypos.x + 1, this.hotkeypos.y + 1, this.size.w - 2, this.size.h - 2, Color.WINDOW.HOTKEY.INNER)
            const Text = (this.listening) ? "..." : (Config[this.id].state == HotkeyState.ALWAYS) ? "Enabled" : (Config[this.id].state == HotkeyState.DISABLED) ? "Disabled" : Config[this.id].key;
            const TextSize = Render.TextSize(Text, Font.ELEMENT);
            Render.String(this.hotkeypos.x + 1 + this.size.w/2 - TextSize[0]/2, this.hotkeypos.y + 3, 0, Text, Color.TEXT.ELEMENT, Font.ELEMENT);
            if (this.changingstate) {
                Render.FilledRoundRect(this.parent.pos.x + this.parent.bounds.w + 31, this.hotkeypos.y, this.stateareasize.w, this.stateareasize.h, Color.WINDOW.HOTKEY.OUTER);
                Render.FilledRoundRect(this.parent.pos.x + this.parent.bounds.w + 32, this.hotkeypos.y + 1, this.stateareasize.w - 2, this.stateareasize.h - 2, Color.WINDOW.HOTKEY.INNER)

                for (var i in HotkeyState) {
                    const Position = this.hotkeypos.y + HotkeyState[i] * 20;
                    const Option = Pascal(i.toString())
                    const OptionHovered = InBounds(this.parent.pos.x + this.parent.bounds.w + 31, Position, this.stateareasize.w, 15);
                    const TextSize = Render.TextSize(Option, Font.ELEMENT);

                    if (OptionHovered && InputSystem.IsKeyPressed(1)) {
                        Config[this.id].state = HotkeyState[i];
                        this.changingstate = false;
                    }

                    Render.String((this.parent.pos.x + this.parent.bounds.w + 31) + this.stateareasize.w/2 - TextSize[0]/2, Position, 0, Option, (Config[this.id].state == HotkeyState[i] || OptionHovered) ? Config.cAccent : Color.TEXT.ELEMENT, Font.ELEMENT);
                }
            }

            Render.String(this.pos.x, this.pos.y + 3, 0, this.name, Color.TEXT.ELEMENT, Font.ELEMENT);
        }
    }

    this.CTextbox = function(parent, name, id) {
        this.parent = parent;
        this.name = name;
        this.id = id;
        this.hovered = false;
        this.listening = false;
        this.color = Color.WINDOW.TEXTBOX.OUTER;
        this.dashalpha = 0;
        this.donelooping = false;
        this.pos = {
            x: 0,
            y: 0
        }
        this.size = {
            w: this.parent.bounds.w - 40,
            h: 29
        }
        this.bounds = {
            w: 0,
            h: 0
        }

        this.Handle = function(Position) {
            this.pos = {
                x: this.parent.pos.x + 20,
                y: Position
            }
            this.bounds = {
                w: this.size.w + 1,
                h: this.size.h + 1
            }

            if (this.pos.y + this.bounds.h > this.parent.pos.y + this.parent.bounds.h)
                return;

            this.hovered = InBounds(this.pos.x, this.pos.y, this.bounds.w, this.bounds.h);

            if (this.hovered) {
                if (InputSystem.IsKeyPressed(1)) {
                    this.listening = !this.listening;
                    this.dashalpha = 0;
                }
            } else {
                if (InputSystem.IsKeyPressed(1))
                    this.listening = false;
            }

            if (this.listening) {
                if (!this.donelooping) {
                    if (this.dashalpha <= 0)
                        this.donelooping = true;
                    else
                        this.dashalpha = LerpInt(this.dashalpha, 0);
                } else {
                    if (this.dashalpha >= 255)
                        this.donelooping = false;
                    else
                        this.dashalpha = LerpInt(this.dashalpha, 255);
                }

                for (var i in Keys) {
                    if (((Keys[i] != 0x20 && Keys[i] != 0x08) && Keys[i] < 0x30) || Keys[i] > 0x5A)
                        continue;
                    if (InputSystem.IsKeyPressed(Keys[i])) {
                        if (Keys[i] == 0x20 && Config[this.id].length < 21)
                            Config[this.id] += " ";
                        else if (Keys[i] == 0x08)
                            Config[this.id] = Config[this.id].substring(0, Config[this.id].length - 1);
                        else if (Config[this.id].length < 21)
                            Config[this.id] += i.toString();
                    }
                }
            }

            if (this.hovered || this.listening)
                this.color = LerpColor(this.color, Config.cAccent);
            else
                this.color = LerpColor(this.color, Color.WINDOW.TEXTBOX.OUTER);

            this.Render();
        }

        this.Render = function() {
            Render.FilledRoundRect(this.pos.x, this.pos.y, this.size.w, this.size.h, this.color)
            Render.FilledRoundRect(this.pos.x + 1, this.pos.y + 1, this.size.w - 2, this.size.h - 2, Color.WINDOW.TEXTBOX.INNER)
            Render.String(this.pos.x + 10, this.pos.y + 6, 0, Config[this.id], Color.TEXT.ELEMENT, Font.ELEMENT);
            if (this.listening) {
                const TextSize = Render.TextSize(Config[this.id], Font.ELEMENT);
                Render.String(this.pos.x + TextSize[0] + 9, this.pos.y + 5, 0, "|", [Color.TEXT.ELEMENT[0], Color.TEXT.ELEMENT[1], Color.TEXT.ELEMENT[2], this.dashalpha], Font.ELEMENT);
            }
        }
    }

    this.CColorPicker = function(parent, name, id) {
        this.parent = parent;
        this.name = name;
        this.id = id;
        this.hoveredelement = false;
        this.hoveredpalette = false
        this.openedpalette = false;
        this.openedinput = false;
        this.pasted = false;
        this.draggingpalette = false;
        this.hoveredhue = false;
        this.dragginghue = false;
        this.hoveredalpha = false;
        this.draggingalpha = false;
        this.selectpos = {
            x: 0,
            y: 0
        }
        this.selectsize = {
            w: 4,
            h: 4
        }
        this.pos = {
            x: 0,
            y: 0
        }
        this.elementpos = {
            x: 0,
            y: 0
        }
        this.elementsize = {
            w: 24,
            h: 24
        }
        this.inputsize = {
            w: 60,
            h: 58
        }
        this.inputpos = {
            x: 0,
            y: 0
        }
        this.palettesize = {
            w: 180,
            h: 140
        }
        this.palettepos = {
            x: 0,
            y: 0
        }
        this.alphapos = {
            x: 0,
            y: 0
        }
        this.alphasize = {
            w: 160,
            h: 10
        }
        this.alphaselectorpos = {
            x: 0,
            y: 0
        }
        this.huepos = {
            x: 0,
            y: 0
        }
        this.huesize = {
            w: 187,
            h: 10
        }
        this.hueselectorpos = {
            x: 0,
            y: 0
        }
        this.bounds = {
            w: 0,
            h: 0
        }
        this.initcolor = RGB2HSV(Config[this.id]);
        this.hsv = {
            h: this.initcolor.h,
            s: this.initcolor.s,
            v: this.initcolor.v,
            a: this.initcolor.a,
            value: [this.initcolor.h, this.initcolor.s, this.initcolor.v, this.initcolor.a]
        }

        this.Handle = function(Position) {
            this.pos = {
                x: this.parent.pos.x + 20,
                y: Position
            }
            this.elementpos = {
                x: this.parent.pos.x + this.parent.bounds.w - this.elementsize.w - 20,
                y: Position
            }
            this.inputpos = {
                x: this.elementpos.x + 75,
                y: Position
            }
            this.palettepos = {
                x: this.elementpos.x + 76,
                y: Position
            }
            this.selectpos = {
                x: this.palettepos.x + this.palettesize.w - (this.hsv.s * this.palettesize.w / 100),
                y: this.palettepos.y + (100 - this.hsv.v) * this.palettesize.h / 100
            }
            this.huepos = {
                x: this.palettepos.x + 10, 
                y: this.palettepos.y + 150
            }
            this.hueselectorpos = {
                x: this.huepos.x + this.hsv.h * 160 / 360,
                y: this.huepos.y - 2
            }
            this.alphapos = {
                x: this.palettepos.x + 10, 
                y: this.palettepos.y + 170
            }
            this.alphaselectorpos = {
                x: this.alphapos.x + this.hsv.a * 160 / 255,
                y: this.alphapos.y - 2
            }
            this.bounds = {
                w: (this.elementpos.x + this.elementsize.w + 1) - this.pos.x, 
                h: this.elementsize.h + 1
            }

            if (this.openedpalette) {
                this.hoveredpalette = InBounds(this.palettepos.x, this.palettepos.y, this.palettesize.w, this.palettesize.h);
                this.draggingpalette = ((this.hoveredpalette || !this.hoveredpalette && this.draggingpalette) && (InputSystem.IsKeyPressed(1) && InputSystem.IsKeyDown(1) || this.draggingpalette && InputSystem.IsKeyDown(1)));

                this.hoveredhue = InBounds(this.huepos.x, this.huepos.y, this.huesize.w, this.huesize.h);
                this.dragginghue = ((this.hoveredhue || !this.hoveredhue && this.dragginghue) && (InputSystem.IsKeyPressed(1) && InputSystem.IsKeyDown(1) || this.dragginghue && InputSystem.IsKeyDown(1)));

                this.hoveredalpha = InBounds(this.alphapos.x, this.alphapos.y, this.alphasize.w, this.alphasize.h);
                this.draggingalpha = ((this.hoveredalpha || !this.hoveredalpha && this.draggingalpha) && (InputSystem.IsKeyPressed(1) && InputSystem.IsKeyDown(1) || this.draggingalpha && InputSystem.IsKeyDown(1)));

                if ((InputSystem.IsKeyPressed(1) || InputSystem.IsKeyPressed(2)) && !InBounds(this.palettepos.x - 1, this.palettepos.y - 1, 182, 192))
                    this.openedpalette = !this.openedpalette;

                if (this.draggingpalette) {
                    var delta_x = (this.palettepos.x + this.palettesize.w - Data.MousePos.x).Clamp(0, this.palettesize.w);
                    var delta_y = (this.palettepos.y + this.palettesize.h - Data.MousePos.y).Clamp(0, this.palettesize.h);

                    this.hsv.s = delta_x * 100 / this.palettesize.w;
                    this.hsv.v = delta_y * 100 / this.palettesize.h;
                }

                if (this.dragginghue) {
                    const delta_x = (this.huepos.x + 160 - Data.MousePos.x).Clamp(0, 160);
                    this.hsv.h = 360 - (delta_x * 360 / 160);
                }

                if (this.draggingalpha) {
                    const delta_x = (this.alphapos.x + 160 - Data.MousePos.x).Clamp(0, 160);
                    this.hsv.a = (255 - (delta_x * 255 / 160));
                }
            }

            if (this.openedinput) {
                if ((InputSystem.IsKeyPressed(1) || InputSystem.IsKeyPressed(2)) && !InBounds(this.inputpos.x, this.inputpos.y, this.inputsize.w, this.inputsize.h))
                    this.openedinput = !this.openedinput;
            }

            this.hoveredelement = InBounds(this.elementpos.x, this.elementpos.y, this.elementsize.w, this.elementsize.h);         
            if (this.hoveredelement) {
                if (InputSystem.IsKeyPressed(1) && !this.openedinput)
                    this.openedpalette = !this.openedpalette;
                else if (InputSystem.IsKeyPressed(2) && !this.openedpalette)
                    this.openedinput = !this.openedinput;
            }

            this.hsv.value = [
                this.hsv.h,
                this.hsv.s,
                this.hsv.v,
                this.hsv.a
            ];

            if (this.pasted) {
                const TmpClr = RGB2HSV(Config[this.id]);
                this.hsv = {
                    h: TmpClr.h,
                    s: TmpClr.s,
                    v: TmpClr.v,
                    a: TmpClr.a,
                    value: [TmpClr.h, TmpClr.s, TmpClr.v, TmpClr.a]
                }
                this.pasted = false;
            } else
                Config[this.id] = HSV2RGB(this.hsv.value);

            if (this.pos.y + this.bounds.h > this.parent.pos.y + this.parent.bounds.h)
                return;

            this.Render();
        }

        this.Render = function() {
            Render.FilledRoundRect(this.elementpos.x, this.elementpos.y, this.elementsize.w, this.elementsize.h, Color.WINDOW.COLORPICKER.OUTER)
            Render.FilledRoundRect(this.elementpos.x + 1, this.elementpos.y + 1, this.elementsize.w - 2, this.elementsize.h - 2, Config[this.id])
            Render.String(this.pos.x, this.pos.y + 3, 0, this.name, Color.TEXT.ELEMENT, Font.ELEMENT);

            if (this.openedpalette) {
                //background overlay
                Render.Rect(this.palettepos.x - 1, this.palettepos.y - 1, this.palettesize.w + 2, this.palettesize.h + 52, [40, 40, 40, 255]);
                Render.FilledRect(this.palettepos.x, this.palettepos.y + this.palettesize.h, this.palettesize.w, 50, Color.WINDOW.COLORPICKER.BACKGROUND);

                //palette
                Render.FilledRect(this.palettepos.x, this.palettepos.y, this.palettesize.w, this.palettesize.h, HSV2RGB([this.hsv.h, 100, 100, 255]));
                Render.GradientRect(this.palettepos.x, this.palettepos.y, this.palettesize.w, this.palettesize.h, 1, [255, 255, 255, 0], [255, 255, 255, 255]);
                Render.GradientRect(this.palettepos.x, this.palettepos.y, this.palettesize.w, this.palettesize.h, 0, [0, 0, 0, 0], [0, 0, 0, 255]);

                //palette selector
                Render.Circle(this.selectpos.x, this.selectpos.y, 3, [255,255,255,255]);

                //hue
                Render.HueRect(this.huepos.x, this.huepos.y, this.huesize.w);
                //hue selector
                Render.FilledRect(this.hueselectorpos.x, this.hueselectorpos.y, 4, 14, [255,255,255,255]);

                //alpha
                Render.GradientRect(this.alphapos.x, this.alphapos.y, this.alphasize.w, this.alphasize.h, 1, [0, 0, 0, Config[this.id][3]], Config[this.id]);
                //alpha selector
                Render.FilledRect(this.alphaselectorpos.x, this.alphaselectorpos.y, 4, 14, [255,255,255,255]);
            } 
            
            if (this.openedinput) {
                Render.FilledRect(this.inputpos.x, this.inputpos.y, this.inputsize.w, this.inputsize.h, Color.WINDOW.COLORPICKER.BACKGROUND);
                Render.Rect(this.inputpos.x, this.inputpos.y, this.inputsize.w, this.inputsize.h, [40, 40, 40, 255]);
                
                const Inputs = ["Copy", "Paste"];
                for (var i = 0; i < Inputs.length; i++) {
                    const Input = Inputs[i];
                    const TextSize = Render.TextSize(Input, Font.ELEMENT);
                    const Position = this.inputpos.y + (i*28) + 6;
                    const OptionHovered = InBounds(this.inputpos.x, Position, this.inputsize.w, 20);
                    const Clr = OptionHovered ? Config.cAccent : Color.TEXT.ELEMENT;

                    if (OptionHovered && InputSystem.IsKeyPressed(1)) {
                        if (Input == "Copy") {
                            Data.Clipboard = Config[this.id];
                        }
                        else if (Input == "Paste")
                            if (Data.Clipboard.length) {
                                this.pasted = true;
                                Config[this.id] = Data.Clipboard;
                            }
                            /*else
                                Logs.Log("Could not paste color, clipboard is empty");*/

                        this.openedinput = false;
                    }

                    Render.String(this.inputpos.x + this.inputsize.w/2 - TextSize[0]/2, Position, 0, Input, Clr, Font.ELEMENT);
                }
            }
        }
    }
}

function HandleHotkeys() {
    Config.kMenu.active = IsKeyActive(Config.kMenu);
    Config.kInvert.active = IsKeyActive(Config.kInvert);
    Config.kDmgOverride.active = IsKeyActive(Config.kDmgOverride);
    Config.kPingSpike.active = IsKeyActive(Config.kPingSpike);
    Config.kMMFD.active = IsKeyActive(Config.kMMFD);
    Config.kIdealTick.active = IsKeyActive(Config.kIdealTick);
    Config.kFreestanding.active = IsKeyActive(Config.kFreestanding);
}

function Draw() {
    InputSystem.Update();
    Data.Update();
    Tooltip.render = false;

    if (Windows.length) {
        for (var i = 0; i < Windows.length; i++) {
            const Window = Windows[i];

            Window.Handle();

            if (Window.type == WindowType.MAINMENU && Window.tabs.length) {
                if (!Window.closed) {
                    for (var j = 0; j < Window.tabs.length; j++) {
                        const Tab = Window.tabs[j];
                        const Position = Window.x + 165 + j*90;

                        Tab.Handle(Position);
                    }
                }
            }
        }

        if (Tooltip.render && Tooltip.text.length) {
            Tooltip.alpha = LerpInt(Tooltip.alpha, 255);
            const Lines = (Tooltip.text.match(/\n/g) || []).length;
            var TextSize = Render.TextSize(Tooltip.text, Font.ELEMENT);
            TextSize[1] = (TextSize[1] * (Lines + 1) + Lines*6);
            const size = {
                w: 30 + TextSize[0],
                h: 32 + (Lines * 20)
            }
            const pos = {
                x: Data.MousePos.x + 15,
                y: Data.MousePos.y + 15
            }

            var CLR_BGR = Color.TOOLTIP.BACKGROUND;
            CLR_BGR[3] = Tooltip.alpha;
            Render.FilledRect(pos.x, pos.y, size.w, size.h, CLR_BGR);

            var CLR_OUTER = Color.TOOLTIP.OUTER;
            CLR_OUTER[3] = Tooltip.alpha;
            Render.Rect(pos.x, pos.y, size.w, size.h, CLR_OUTER)
            Render.Rect(pos.x + 3, pos.y + 3, size.w - 6, size.h - 6, CLR_OUTER)

            var CLR_INNER = Color.TOOLTIP.INNER;
            CLR_INNER[3] = Tooltip.alpha;
            Render.Rect(pos.x + 1, pos.y + 1, size.w - 2, size.h - 2, CLR_INNER);
            Render.Rect(pos.x + 2, pos.y + 2, size.w - 4, size.h - 4, CLR_INNER);
            Render.String(pos.x + 15, pos.y + size.h/2 - TextSize[1]/2 - 2, 0, Tooltip.text, [200, 200, 200, Tooltip.alpha], Font.ELEMENT);
        } else {
            Tooltip.alpha = 0;
        }
    }
    HandleHotkeys();
}

function IsConfigInvalid(conf) {
    if (typeof conf["ConfigMgrVer"] == "undefined")
        return true;
    else if (conf["ConfigMgrVer"] != Config.ConfigMgrVer)
        return true;

    return false;
}

function LoadConfig() {
    try {
        DataFile.Load(Config.sConfig + ".cfg");
        var Cfg = "";
        for (var i = 0; i < 32; i++) {
            const _Data = DataFile.GetKey(Config.sConfig + ".cfg", i.toString());
            Cfg += _Data.length > 0 ? _Data : "";
        }
        if (Cfg.length > 0) {
            const ParsedCfg = JSON.parse(Cfg);

            if (IsConfigInvalid(ParsedCfg)) {
                //Logs.Log("Your configuration is not supported by this version of ConfigManger, please make a new one");
                for (var i = 0; i < 32; i++) {
                    DataFile.EraseKey(Config.sConfig + ".cfg", DataFile.GetKey(Config.sConfig + ".cfg", i.toString()));
                }
                return;
            }

            StoredCfg = ParsedCfg;
            for (var i in Object.keys(Config)) {
                const KeyName = Object.keys(Config)[i];
                for (j in Object.keys(StoredCfg)) {
                    const StoredKeyName = Object.keys(StoredCfg)[j];
                    if (KeyName == StoredKeyName) {
                        Config[KeyName] = StoredCfg[KeyName];
                    } 
                }
            }

            //Logs.Log("Loaded {0}.cfg".format(Config.sConfig));
        } else {
            //Logs.Log("Unable to load {0}.cfg, file doesn't exist".format(Config.sConfig));
        }
    } catch (e) {
        //Logs.Log("An error has occured while loading your configuration");
        /*if (IsDev())
            Logs.Log("{0}".format(e));*/
    }
}

function SaveConfig() {
    try {
        const Cfg = JSON.stringify(Config);
        for (var i = 0; i < Cfg.length/255; i++)
            DataFile.SetKey(Config.sConfig + ".cfg", i.toString(), Cfg.substring(i*255, (i+1)*255))

        DataFile.Save(Config.sConfig + ".cfg");
        //Logs.Log("Saved to {0}.cfg".format(Config.sConfig));
    } catch (e) {
        //Logs.Log("An error has occured while saving your configuration");
        /*if (IsDev())
            Logs.Log("{0}".format(e))*/
    }
}

function Initialize() {
    LoadConfig();
    
    Windows = [];
    Menu = new CWindow(Style.WINDOW.w, Style.WINDOW.h, "SCRIPTNAME", WindowType.MAINMENU);

    Menu.AddTab("Aimbot"); {
        Menu.AddSubtab("Aimbot", "Main"); {
            Menu.AddGroupbox("Aimbot", "Main")
            .AddCheckbox("Master switch", "bRbot", "")
            .AddCheckbox("Improve doubletap", "bDtImprove", "Improves doubletap speed, recharge and much more.")
            .AddCheckbox("Boost sniper recharge", "bBoostSniperRecharge", "Improves recharge times with awp/ssg08.\nHighly efficient while using ideal tick.")
            .AddSlider("Doubletap recharge delay", "iDtDelay", "{0} ticks", 0, 64)
            .AddCheckbox("Disable desync on doubletap", "bDisDesync", "Disables desync to achieve faster doubletap.")
            .AddCheckbox("Dynamic doubletap damage", "bDynDtDmg", "Adjusts your min. damage dynamically\nwhile doubletap is active.")
            .AddCheckbox("Dynamic revolver damage", "bDynRevDmg", "Adjusts your min. damage dynamically\nwhile using revolver.")
            .AddMultiDropdown("Force safepoint", "mHboxSafety", "Forces safepoint on selected hitboxes.", ["Head", "Chest", "Body", "Pelvis", "Legs", "Hands"])
        }
        Menu.AddSubtab("Aimbot", "Hitchance"); {
            Menu.AddGroupbox("Aimbot", "Hitchance")
            .AddMultiDropdown("Dynamic hitchance", "mDynHc", "Enables dynamic hitchance for selected weapons.\n\nAdjusts your hitchance on many factors and\nwill noscope near enemies using 0 hitchance.", ["SCAR20/G3SG1", "R8/Deagle", "SSG08", "AWP", "Pistols", "Other"])
            .AddCheckbox("Jump scout", "bJumpScout", "Allows the ragebot to fire while you're fully\naccurate in air to perform a jump scout.")
            .AddCheckbox("Noscope enemies near", "bNsNear", "Requirements:\nDynamic hitchance enabled.")
            .AddSlider("Noscope distance", "iNsDist", "{0} units", 0, 500)
            .AddMultiDropdown("", "mDynHcNsOptions", "Options that apply when enemy is within noscope range.\n\nRequirements:\nDynamic hitchance enabled.", ["Force damage to health/2", "Ignore unsafe hitboxes"])
        }
        Menu.AddSubtab("Aimbot", "Autowall"); {
            Menu.AddGroupbox("Aimbot", "Autowall")
            .AddCheckbox("Enable autowall", "bAwall", "")   
            .AddSlider("Global damage", "iGlobalDmg", "{0} damage", 0, 130)
            .AddSlider("Auto damage", "iAutoDmg", "{0} damage", 0, 130)
            .AddSlider("AWP damage", "iAWPDmg", "{0} damage", 0, 130)
            .AddSlider("SSG08 damage", "iScoutDmg", "{0} damage", 0, 130)
        }
        Menu.AddSubtab("Aimbot", "Customization"); {
            Menu.AddGroupbox("Aimbot", "Customization")
            .AddMultiDropdown("Logs", "mLogs", "", ["Damage dealt", "Damage received",/*, "Damage rejected", "Miss reasons",*/"Shot data", "Purchases"])
            .AddHotkey("Damage override", "kDmgOverride", "Overrides min. damage.")
            .AddSlider("", "iDmgOverride", "{0} damage\n>100 = HP+", 1, 130)
        }
    }

    //add update callback where it calls this thing again.

    Menu.AddTab("Anti-Aim"); {
        Menu.AddSubtab("Anti-Aim", "Main"); {
            Menu.AddGroupbox("Anti-Aim", "Main")
            .AddCheckbox("Master switch", "bAA", "")
            .AddCheckbox("Invert while slow walking", "bAutoInvert", "Automatically inverts Anti-Aim while slow walking.")
            .AddCheckbox("Peek advantage", "bDisAAOnPeek", "Disables your Anti-Aim on peek to gain advantage.")
            .AddCheckbox("Self learning", "bSelfLearn", "")
            .AddCheckbox("Prevent height advantage", "bPrevHeight", "Prevents Height Advantage.\nForces your head forward to prevent\nplayers above you to have height advantage.")
            .AddSlider("Activation distance", "iPrevHeightDist", "{0} units", 0, 600)
            .AddHotkey("Side inverter", "kInvert", "Inverts your Anti-Aim.")
            .AddHotkey("Freestanding", "kFreestanding", "")
            .AddHotkey("Matchmaking fake duck", "kMMFD", "Matchmaking fake duck.\n\nRequirements:\nDoubletap & hide shots disabled.")
        }
        Menu.AddSubtab("Anti-Aim", "Presets"); {
            Menu.AddGroupbox("Anti-Aim", "Presets")
            .AddDropdown("Anti-Aim preset", "dAA", "", ["Disabled", "Anti-Bruteforce", "Low delta", "High delta", "Experimental"])
            .AddDropdown("Fakelag preset", "dFL", "Switch - Uneven cycles.\nAdaptive - Adapts strength depending on velocity.\nFluctuate - Strength fluctuates on each cycle.", ["Disabled", "Switch", "Adaptive", "Fluctuate", "Random"])
            //.AddDropdown("Pitch", "dPitch", "Untrusted feature.", ["Disabled", "Down", "Emotion", "Zero", "Up", "Fake up", "Fake down"], true);
        }
        Menu.AddSubtab("Anti-Aim", "Custom"); {
            Menu.AddGroupbox("Anti-Aim", "Custom")
            .AddCheckbox("Enable custom Anti-Aim", "bCustomAA", "Enables custom Anti-Aim.\n\nRequirements:\nAnti-Aim preset must be set to \"Disabled\".")
            .AddSlider("Real yaw", "iReal", "{0} degrees", 0, 60)
            .AddSlider("Fake yaw", "iFake", "{0} degrees", -180, 180)
            .AddSlider("Lowerbody yaw", "iLby", "{0} degrees", -120, 120)
            .AddCheckbox("Custom fakelag", "bFL", "Enables custom fakelag.\n\nRequirements:\nFakelag preset must be set to \"Disabled\".")
            .AddSlider("Choke", "iFL", "{0} ticks", 0, 14)
            .AddSlider("Jitter", "iJitter", "{0}%", 0, 100)
        }
    }
    Menu.AddTab("Visuals"); {
        Menu.AddSubtab("Visuals", "Main"); {
            Menu.AddGroupbox("Visuals", "Main")
            .AddCheckbox("Master switch", "bVis", "")
            .AddDropdown("Anti-Aim arrows", "dAAA", "", ["Disabled", "Regular", "Health"])
            .AddMultiDropdown("Local indicators", "mIndicators", "", ["Charge", "Choke", "Damage override", "Dynamic hitchance", "Noscope radius" /*"Bomb Damage"*/])
            .AddMultiDropdown("Enemy indicators", "mEnemyFlags", "Ping comparison - Difference between latencies.\nNoscope range - Indicates if enemy is within noscope range.\nRevolver one shot - Indicates if enemy can be one shot by a revolver.", ["Ping comparison", "Noscope range", "Revolver one shot"])
            //.AddMultiDropdown("Enemy Indicators", "mEnemyIndicators", "Vulnerable displays on enemies\nthat may have a hard time shooting\nback at you", ["Vulnerable"])
        }

        Menu.AddSubtab("Visuals", "World"); {
            Menu.AddGroupbox("Visuals", "World")
            .AddCheckbox("Enable world visuals", "bVisWorld", "")
            //.AddCheckbox("Snow", "bSnow", "Enables snow effect on your screen")
            .AddCheckbox("Lightning on kill", "bLightningOnKill", "Spawns a lightning where our target died.")
            .AddCheckbox("Lightning sound", "bLightningSound", "Enables sound for Lightning on kill.")
            .AddSlider("Aspect ratio", "iAspectRatio", "{0}%", 0, 233)
        }

        Menu.AddSubtab("Visuals", "Colors"); {
            Menu.AddGroupbox("Visuals", "Colors")
            .AddColorPicker("Menu", "cAccent")
            .AddColorPicker("Watermark", "cWatermark")
            .AddColorPicker("Indicators", "cIndicators")
            .AddColorPicker("Anti-Aim arrows", "cAAA")
            .AddColorPicker("Logs", "cLogs")
        }
    }
    Menu.AddTab("Misc"); {
        Menu.AddSubtab("Misc", "Main"); {
            Menu.AddGroupbox("Misc", "Main")
            .AddHotkey("Menu", "kMenu", "")
            .AddHotkey("Ping spike", "kPingSpike", "Enables ping spike.")
            .AddHotkey("Ideal tick", "kIdealTick", "Prevents enemies from firing back at you.")
            .AddDropdown("Advertise clantag", "dClan", "Advertises clantag.", ["Disabled", "Static", "Animated"])
        }
        Menu.AddSubtab("Misc", "Configurations"); {
            Menu.AddGroupbox("Misc", "Configurations")
            .AddTextbox("Config name", "sConfig")
            .AddButton("Load configuration", LoadConfig)
            .AddButton("Save configuration", SaveConfig)
        }
        if (IsDev()) {
            Menu.AddSubtab("Misc", "Debug"); {
                Menu.AddGroupbox("Misc", "Debug")
                .AddCheckbox("Debug script data", "bDebugData", "")
                .AddCheckbox("Debug menu boundaries", "bDebugBounds", "")
                .AddSlider("Shift override", "iShift", "{0} ticks", 16, 32)
            }
            Menu.AddSubtab("Misc", "Alpha"); {
                Menu.AddGroupbox("Misc", "Alpha")
            }
        }
    }

    Windows.push(Menu);

    //Logs.Log("Welcome {0} [{1}]".format(un(), Data.Build));
}
Initialize();

function Unload() {
    delete Windows;
    delete Menu;
    Input.ForceCursor(0);
}

Cheat.RegisterCallback("Draw", "Draw");//Framework
Cheat.RegisterCallback("Unload", "Unload");