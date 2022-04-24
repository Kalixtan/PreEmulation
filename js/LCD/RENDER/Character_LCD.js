'use strict';
class render_character_LCD {
	constructor(core, LCD, layout) {
		this.core = core;
		this.LCD = LCD;
		this.layout = layout;
		
		this.BackColor = "#7DBE00";
		this.PixelOnColor = "#000000";
		this.PixelOffColor = "#6FB900";
		
		this.pixel_size = 4;
		this.pixel_space = 5;
		this.char_space = 6;
		this.border = 8;
		
		this.font = [
			[],[],[],[],
			[],[],[],[],
			[],[],[],[],
			[],[],[],[],
			[0x00, 0x7f, 0x3e, 0x1c, 0x08], //  16 -
			[0x08, 0x1c, 0x3e, 0x7f, 0x00], //  17 -
			[0x30, 0x50, 0x00, 0x30, 0x50], //  18 -
			[0x50, 0x60, 0x00, 0x50, 0x60], //  19 -
			[0x11, 0x33, 0x77, 0x33, 0x11], //  20 -
			[0x44, 0x66, 0x77, 0x66, 0x44], //  21 -
			[0x1c, 0x3e, 0x3e, 0x3e, 0x1c], //  22 -
			[0x04, 0x0e, 0x15, 0x04, 0x7c], //  23 -
			[0x10, 0x20, 0x7f, 0x20, 0x10], //  24 -
			[0x04, 0x02, 0x7f, 0x02, 0x04], //  25 -
			[0x08, 0x08, 0x2a, 0x1c, 0x08], //  26 -
			[0x08, 0x1c, 0x2a, 0x08, 0x08], //  27 -
			[0x01, 0x11, 0x29, 0x45, 0x01], //  28 -
			[0x01, 0x45, 0x29, 0x11, 0x01], //  29 -
			[0x02, 0x0e, 0x3e, 0x0e, 0x02], //  30 -
			[0x20, 0x38, 0x3e, 0x38, 0x20], //  31 -
			[0x00, 0x00, 0x00, 0x00, 0x00], //  32 -
			[0x00, 0x00, 0x79, 0x00, 0x00], //  33 - !
			[0x00, 0x70, 0x00, 0x70, 0x00], //  34 - "
			[0x14, 0x7f, 0x14, 0x7f, 0x14], //  35 - #
			[0x12, 0x2a, 0x7f, 0x2a, 0x24], //  36 - $
			[0x62, 0x64, 0x08, 0x13, 0x23], //  37 - %
			[0x36, 0x49, 0x55, 0x22, 0x05], //  38 - &
			[0x00, 0x50, 0x60, 0x00, 0x00], //  39 - '
			[0x00, 0x1c, 0x22, 0x41, 0x00], //  40 - (
			[0x00, 0x41, 0x22, 0x1c, 0x00], //  41 - )
			[0x14, 0x08, 0x3e, 0x08, 0x14], //  42 - *
			[0x08, 0x08, 0x3e, 0x08, 0x08], //  43 - +
			[0x00, 0x05, 0x06, 0x00, 0x00], //  44 - ,
			[0x08, 0x08, 0x08, 0x08, 0x08], //  45 - -
			[0x00, 0x03, 0x03, 0x00, 0x00], //  46 - .
			[0x02, 0x04, 0x08, 0x10, 0x20], //  47 - /
			[0x3e, 0x45, 0x49, 0x51, 0x3e], //  48 - 0
			[0x00, 0x21, 0x7f, 0x01, 0x00], //  49 - 1
			[0x21, 0x43, 0x45, 0x49, 0x31], //  50 - 2
			[0x42, 0x41, 0x51, 0x69, 0x46], //  51 - 3
			[0x0c, 0x14, 0x24, 0x7f, 0x04], //  52 - 4
			[0x72, 0x51, 0x51, 0x51, 0x4e], //  53 - 5
			[0x1e, 0x29, 0x49, 0x49, 0x06], //  54 - 6
			[0x40, 0x47, 0x48, 0x50, 0x60], //  55 - 7
			[0x36, 0x49, 0x49, 0x49, 0x36], //  56 - 8
			[0x30, 0x49, 0x49, 0x4a, 0x3c], //  57 - 9
			[0x00, 0x36, 0x36, 0x00, 0x00], //  58 - :
			[0x00, 0x35, 0x36, 0x00, 0x00], //  59 - ;
			[0x08, 0x14, 0x22, 0x41, 0x00], //  60 - <
			[0x14, 0x14, 0x14, 0x14, 0x14], //  61 - =
			[0x00, 0x41, 0x22, 0x14, 0x08], //  62 - >
			[0x20, 0x40, 0x45, 0x48, 0x30], //  63 - ?
			[0x26, 0x49, 0x4f, 0x41, 0x3e], //  64 - @
			[0x1f, 0x24, 0x44, 0x24, 0x1f], //  65 - A
			[0x7f, 0x49, 0x49, 0x49, 0x36], //  66 - B
			[0x3e, 0x41, 0x41, 0x41, 0x22], //  67 - C
			[0x7f, 0x41, 0x41, 0x22, 0x1c], //  68 - D
			[0x7f, 0x49, 0x49, 0x49, 0x41], //  69 - E
			[0x7f, 0x48, 0x48, 0x48, 0x40], //  70 - F
			[0x3e, 0x41, 0x49, 0x49, 0x2f], //  71 - G
			[0x7f, 0x08, 0x08, 0x08, 0x7f], //  72 - H
			[0x00, 0x41, 0x7f, 0x41, 0x00], //  73 - I
			[0x02, 0x41, 0x41, 0x7e, 0x00], //  74 - J
			[0x7f, 0x08, 0x14, 0x22, 0x41], //  75 - K
			[0x7f, 0x01, 0x01, 0x01, 0x01], //  76 - L
			[0x7f, 0x20, 0x18, 0x20, 0x7f], //  77 - M
			[0x7f, 0x10, 0x08, 0x04, 0x7f], //  78 - N
			[0x3e, 0x41, 0x41, 0x41, 0x3e], //  79 - O
			[0x7f, 0x48, 0x48, 0x48, 0x30], //  80 - P
			[0x3e, 0x41, 0x45, 0x42, 0x3d], //  81 - Q
			[0x7f, 0x48, 0x4c, 0x4a, 0x31], //  82 - R
			[0x31, 0x49, 0x49, 0x49, 0x46], //  83 - S
			[0x40, 0x40, 0x7f, 0x40, 0x40], //  84 - T
			[0x7e, 0x01, 0x01, 0x01, 0x7e], //  85 - U
			[0x7c, 0x02, 0x01, 0x02, 0x7c], //  86 - V
			[0x7e, 0x01, 0x0e, 0x01, 0x7e], //  87 - W
			[0x63, 0x14, 0x08, 0x14, 0x63], //  88 - X
			[0x70, 0x08, 0x07, 0x08, 0x70], //  89 - Y
			[0x43, 0x45, 0x49, 0x51, 0x61], //  90 - Z
			[0x00, 0x7f, 0x41, 0x41, 0x00], //  91 - [
			[0x20, 0x10, 0x08, 0x04, 0x02], //  92 - fwd slash
			[0x00, 0x41, 0x41, 0x7f, 0x00], //  93 - ]
			[0x10, 0x20, 0x40, 0x20, 0x10], //  94 - ^
			[0x01, 0x01, 0x01, 0x01, 0x01], //  95 - _
			[0x00, 0x40, 0x20, 0x10, 0x00], //  96 - `
			[0x02, 0x15, 0x15, 0x15, 0x0f], //  97 - a
			[0x7f, 0x09, 0x11, 0x11, 0x0e], //  98 - b
			[0x0e, 0x11, 0x11, 0x11, 0x02], //  99 - c
			[0x0e, 0x11, 0x11, 0x09, 0x7f], // 100 - d
			[0x0e, 0x15, 0x15, 0x15, 0x0c], // 101 - e
			[0x08, 0x3f, 0x48, 0x40, 0x20], // 102 - f
			[0x18, 0x25, 0x25, 0x25, 0x3e], // 103 - g
			[0x7f, 0x08, 0x10, 0x10, 0x0f], // 104 - h
			[0x00, 0x09, 0x5f, 0x01, 0x00], // 105 - i
			[0x02, 0x01, 0x11, 0x5e, 0x00], // 106 - j
			[0x7f, 0x04, 0x0a, 0x11, 0x00], // 107 - k
			[0x01, 0x41, 0x7f, 0x01, 0x01], // 108 - l
			[0x1f, 0x10, 0x0c, 0x10, 0x0f], // 109 - m
			[0x1f, 0x08, 0x10, 0x10, 0x0f], // 110 - n
			[0x0e, 0x11, 0x11, 0x11, 0x0e], // 111 - o
			[0x1f, 0x14, 0x14, 0x14, 0x08], // 112 - p
			[0x08, 0x14, 0x14, 0x0c, 0x1f], // 113 - q
			[0x1f, 0x08, 0x10, 0x10, 0x08], // 114 - r
			[0x09, 0x15, 0x15, 0x15, 0x02], // 115 - s
			[0x10, 0x7e, 0x11, 0x01, 0x02], // 116 - t
			[0x1e, 0x01, 0x01, 0x02, 0x1f], // 117 - u
			[0x1c, 0x02, 0x01, 0x02, 0x1c], // 118 - v
			[0x1e, 0x01, 0x06, 0x01, 0x1e], // 119 - w
			[0x11, 0x0a, 0x04, 0x0a, 0x11], // 120 - x
			[0x18, 0x05, 0x05, 0x05, 0x1e], // 121 - y
			[0x11, 0x13, 0x15, 0x19, 0x11], // 122 - z
			[0x00, 0x08, 0x36, 0x41, 0x00], // 123 - [
			[0x00, 0x00, 0x7f, 0x00, 0x00], // 124 - |
			[0x00, 0x41, 0x36, 0x08, 0x00], // 125 - ]
			[0x04, 0x08, 0x08, 0x04, 0x08], // 126 - ~
			[0x1e, 0x22, 0x42, 0x22, 0x1e], // 127 -
			[0x7f, 0x49, 0x49, 0x49, 0x66], // 128 -
			[0x0f, 0x94, 0xe4, 0x84, 0xff], // 129 -
			[0x77, 0x08, 0x7f, 0x08, 0x77], // 130 -
			[0x41, 0x41, 0x49, 0x49, 0x36], // 131 -
			[0x7f, 0x04, 0x08, 0x10, 0x7f], // 132 -
			[0x3f, 0x84, 0x48, 0x90, 0x3f], // 133 -
			[0x02, 0x41, 0x7e, 0x40, 0x7f], // 134 -
			[0x7f, 0x40, 0x40, 0x40, 0x7f], // 135 -
			[0x71, 0x0a, 0x04, 0x08, 0x70], // 136 -
			[0x7e, 0x02, 0x02, 0x02, 0x7f], // 137 -
			[0x70, 0x08, 0x08, 0x08, 0x7f], // 138 -
			[0x3f, 0x01, 0x3f, 0x01, 0x3f], // 139 -
			[0x7e, 0x02, 0x7e, 0x02, 0x7f], // 140 -
			[0x40, 0x7f, 0x09, 0x09, 0x06], // 141 -
			[0x7f, 0x09, 0x06, 0x00, 0x7f], // 142 -
			[0x22, 0x49, 0x51, 0x49, 0x3e], // 143 -
			[0x0e, 0x11, 0x09, 0x06, 0x19], // 144 -
			[0x03, 0x03, 0x7f, 0x20, 0x18], // 145 -
			[0x7f, 0x40, 0x40, 0x40, 0x60], // 146 -
			[0x11, 0x1e, 0x10, 0x1f, 0x11], // 147 -
			[0x63, 0x55, 0x49, 0x41, 0x41], // 148 -
			[0x0e, 0x11, 0x11, 0x1e, 0x10], // 149 -
			[0x06, 0x06, 0xfc, 0xa3, 0x7f], // 150 -
			[0x08, 0x10, 0x1e, 0x11, 0x20], // 151 -
			[0x04, 0x3c, 0x7e, 0x3c, 0x04], // 152 -
			[0x3e, 0x49, 0x49, 0x49, 0x3e], // 153 -
			[0x1d, 0x23, 0x20, 0x23, 0x1d], // 154 -
			[0x06, 0x29, 0x51, 0x49, 0x26], // 155 -
			[0x0c, 0x14, 0x08, 0x14, 0x18], // 156 -
			[0x1c, 0x3e, 0x1f, 0x3e, 0x1c], // 157 -
			[0x0a, 0x15, 0x15, 0x11, 0x02], // 158 -
			[0x3f, 0x40, 0x40, 0x40, 0x3f], // 159 -
			[0x7f, 0x7f, 0x00, 0x7f, 0x7f], // 160 -
			[0x00, 0x00, 0x4f, 0x00, 0x00], // 161 - ¡
			[0x1c, 0x22, 0x7f, 0x22, 0x04], // 162 - ¢
			[0x09, 0x3e, 0x49, 0x41, 0x02], // 163 - £
			[0x22, 0x1c, 0x14, 0x1c, 0x22], // 164 - ¤
			[0x54, 0x34, 0x1f, 0x34, 0x54], // 165 - ¥
			[0x00, 0x00, 0x77, 0x00, 0x00], // 166 - ¦
			[0x02, 0x29, 0x55, 0x4a, 0x20], // 167 - §
			[0x0a, 0x09, 0x3e, 0x48, 0x28], // 168 - ¨
			[0x7f, 0x41, 0x5d, 0x49, 0x7f], // 169 - ©
			[0x09, 0x55, 0x55, 0x55, 0x3d], // 170 - ª
			[0x08, 0x14, 0x2a, 0x14, 0x22], // 171 - «
			[0x7f, 0x08, 0x3e, 0x41, 0x3e], // 172 - ¬
			[0x31, 0x4a, 0x4c, 0x48, 0x7f], // 173 - ­
			[0x7f, 0x41, 0x53, 0x45, 0x7f], // 174 - ®
			[0x00, 0x30, 0x50, 0x00, 0x00], // 175 - ¯
			[0x70, 0x88, 0x88, 0x70, 0x00], // 176 - °
			[0x11, 0x11, 0x7d, 0x11, 0x11], // 177 - ±
			[0x48, 0x98, 0xa8, 0x48, 0x00], // 178 - ²
			[0x88, 0xa8, 0xa8, 0x50, 0x00], // 179 - ³
			[0xfe, 0xa0, 0xa4, 0x4f, 0x05], // 180 - ´
			[0x7f, 0x04, 0x04, 0x08, 0x7c], // 181 - µ
			[0x30, 0x48, 0x48, 0x7f, 0x7f], // 182 - ¶
			[0x00, 0x0c, 0x0c, 0x00, 0x00], // 183 - ·
			[0x0e, 0x11, 0x06, 0x11, 0x0e], // 184 - ¸
			[0x48, 0xf8, 0x08, 0x00, 0x00], // 185 - ¹
			[0x39, 0x45, 0x45, 0x45, 0x39], // 186 - º
			[0x22, 0x14, 0x2a, 0x14, 0x08], // 187 - »
			[0xe8, 0x16, 0x2a, 0x5f, 0x82], // 188 - ¼
			[0xe8, 0x10, 0x29, 0x53, 0x8d], // 189 - ½
			[0xa8, 0xf8, 0x06, 0x0a, 0x1f], // 190 - ¾
			[0x06, 0x09, 0x51, 0x01, 0x02], // 191 - ¿
			[0x0f, 0x94, 0x64, 0x14, 0x0f], // 192 - À
			[0x0f, 0x14, 0x64, 0x94, 0x0f], // 193 - Á
			[0x0f, 0x54, 0x94, 0x54, 0x0f], // 194 - Â
			[0x4f, 0x94, 0x94, 0x54, 0x8f], // 195 - Ã
			[0x0f, 0x94, 0x24, 0x94, 0x0f], // 196 - Ä
			[0x0f, 0x54, 0xa4, 0x54, 0x0f], // 197 - Å
			[0x1f, 0x24, 0x7f, 0x49, 0x49], // 198 - Æ
			[0x78, 0x84, 0x85, 0x87, 0x48], // 199 - Ç
			[0x1f, 0x95, 0x55, 0x15, 0x11], // 200 - È
			[0x1f, 0x15, 0x55, 0x95, 0x11], // 201 - É
			[0x1f, 0x55, 0x95, 0x55, 0x11], // 202 - Ê
			[0x1f, 0x55, 0x15, 0x55, 0x11], // 203 - Ë
			[0x00, 0x91, 0x5f, 0x11, 0x00], // 204 - Ì
			[0x00, 0x11, 0x5f, 0x91, 0x00], // 205 - Í
			[0x00, 0x51, 0x9f, 0x51, 0x00], // 206 - Î
			[0x00, 0x51, 0x1f, 0x51, 0x00], // 207 - Ï
			[0x08, 0x7f, 0x49, 0x41, 0x3e], // 208 - Ð
			[0x5f, 0x88, 0x84, 0x42, 0x9f], // 209 - Ñ
			[0x1e, 0xa1, 0x61, 0x21, 0x1e], // 210 - Ò
			[0x1e, 0x21, 0x61, 0xa1, 0x1e], // 211 - Ó
			[0x0e, 0x51, 0x91, 0x51, 0x0e], // 212 - Ô
			[0x4e, 0x91, 0x91, 0x51, 0x8e], // 213 - Õ
			[0x1e, 0xa1, 0x21, 0xa1, 0x1e], // 214 - Ö
			[0x22, 0x14, 0x08, 0x14, 0x22], // 215 - ×
			[0x08, 0x55, 0x7f, 0x55, 0x08], // 216 - Ø
			[0x3e, 0x81, 0x41, 0x01, 0x3e], // 217 - Ù
			[0x3e, 0x01, 0x41, 0x81, 0x3e], // 218 - Ú
			[0x1e, 0x41, 0x81, 0x41, 0x1e], // 219 - Û
			[0x3e, 0x81, 0x01, 0x81, 0x3e], // 220 - Ü
			[0x20, 0x10, 0x4f, 0x90, 0x20], // 221 - Ý
			[0x81, 0xff, 0x25, 0x24, 0x18], // 222 - Þ
			[0x01, 0x3e, 0x49, 0x49, 0x36], // 223 - ß
			[0x02, 0x95, 0x55, 0x15, 0x0f], // 224 - à
			[0x02, 0x15, 0x55, 0x95, 0x0f], // 225 - á
			[0x02, 0x55, 0x95, 0x55, 0x0f], // 226 - â
			[0x42, 0x95, 0x95, 0x55, 0x8f], // 227 - ã
			[0x02, 0x55, 0x15, 0x55, 0x0f], // 228 - ä
			[0x02, 0x55, 0xb5, 0x55, 0x0f], // 229 - å
			[0x26, 0x29, 0x1e, 0x29, 0x1a], // 230 - æ
			[0x18, 0x25, 0x27, 0x24, 0x08], // 231 - ç
			[0x0e, 0x95, 0x55, 0x15, 0x0c], // 232 - è
			[0x0e, 0x15, 0x55, 0x95, 0x0c], // 233 - é
			[0x0e, 0x55, 0x95, 0x55, 0x0c], // 234 - ê
			[0x0e, 0x55, 0x15, 0x55, 0x0c], // 235 - ë
			[0x00, 0x89, 0x5f, 0x01, 0x00], // 236 - ì
			[0x00, 0x09, 0x5f, 0x81, 0x00], // 237 - í
			[0x00, 0x49, 0x9f, 0x41, 0x00], // 238 - î
			[0x00, 0x49, 0x1f, 0x41, 0x00], // 239 - ï
			[0x52, 0x25, 0x55, 0x0d, 0x06], // 240 - ð
			[0x5f, 0x88, 0x90, 0x50, 0x8f], // 241 - ñ
			[0x0e, 0x91, 0x51, 0x11, 0x0e], // 242 - ò
			[0x0e, 0x11, 0x51, 0x91, 0x0e], // 243 - ó
			[0x06, 0x29, 0x49, 0x29, 0x06], // 244 - ô
			[0x26, 0x49, 0x49, 0x29, 0x46], // 245 - õ
			[0x0e, 0x51, 0x11, 0x51, 0x0e], // 246 - ö
			[0x08, 0x08, 0x2a, 0x08, 0x08], // 247 - ÷
			[0x08, 0x15, 0x3e, 0x54, 0x08], // 248 - ø
			[0x1e, 0x81, 0x41, 0x02, 0x1f], // 249 - ù
			[0x1e, 0x01, 0x41, 0x82, 0x1f], // 250 - ú
			[0x1e, 0x41, 0x81, 0x42, 0x1f], // 251 - û
			[0x1e, 0x41, 0x01, 0x42, 0x1f], // 252 - ü
			[0x18, 0x05, 0x45, 0x85, 0x1e], // 253 - ý
			[0x00, 0x41, 0x7f, 0x15, 0x08], // 254 - þ
			[0x18, 0x45, 0x05, 0x45, 0x1e], // 255 - ÿ
		];
	}
	


	draw_char( ctx, id, char_x, char_y ) {
		var data = this.font[id]
		for (var x = 0; x < data.length; x++) {
			var line = data[x];
			for (var y = 0; y < 8; y++) {
				
				var real_x = ((char_x*this.char_space)+x)*this.pixel_space
				var real_y = ((char_y*this.char_space)+y)*this.pixel_space
				
				ctx.fillStyle =  (( (line & (1 << (7-y))) !== 0 ) ? this.PixelOnColor : this.PixelOffColor);
				ctx.fillRect(this.border+real_x, this.border+real_y, this.pixel_size, this.pixel_size);
			}
		}
	}

	render( canvas ) {
		if (!canvas.getContext) return // canvas-unsupported
		var ctx = canvas.getContext('2d');
		
		
		ctx.fillStyle = this.BackColor;
		ctx.fillRect(0, 0, 640, 500);
		
		
		for (var y = 0; y < this.layout.length; y++) {
			for (var x = 0; x < this.layout[y].length; x++) {
				var cha = this.LCD.get_desplay_byte( this.layout[y][x] )
				this.draw_char( ctx, cha, x, y )
			}
		}
	}
}







