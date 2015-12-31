/*PresentationJS v0.2(pre-alpha)*/

//PresentationJS is part of the OfficeJS series and may be changed or used for non-commercial use.
//It may also be distributed, under the conditions that it has not been changed and is in text format.

var canvas, ctx, imgSpan, soundSpan, videoSpan, content;
function slidesToGo() {
	if (!presentation.slideNums) {
		presentation.load = false;
		alert("Slide Error:\nYou have declared the presentation to be displaying the slides to go when it is already in this mode.");
	}
	presentation.slideNums = false;
};
function title(str) {
	if (presentation.titleCalled) {
		presentation.load = false;
		alert("Title Error:\nYou have designated more than one title for the presentation.");
	} else {
		document.getElementById("title").innerHTML = str;
		presentation.titleCalled = true;
	}
};
function designateTitleSlide(slide) {
	if (presentation.titleSlide.designateCalled) {
		presentation.load = false;
		alert("Title Slide:\nYou have designated a slide as title slide more than once.");
	}
	if (!slide) {
		slide = 1;
	}
	if (slide > presentation.slides.length) {
		presentation.load = false;
		alert("Slide Error:\nYou have designated a slide that has not yet been created as a title slide.\nIt is best practice to create all slides before all other content.")
	} else {
		presentation.slides[slide-1].titleSlide = true;
	}
};
function titleSlideHeading(heading, colour, font) {
	if (presentation.titleSlide.headingCalled) {
		presentation.load = false;
		alert("Title Slide Heading Error:\nYou have designated a heading for the title slide more than once.");
	} else {
		presentation.titleSlide.headingCalled = true;
		presentation.titleSlide.heading = heading;
		if (colour) {
			presentation.titleSlide.colour = colour;
		}
		if (font) {
			presentation.titleSlide.font = font;
		}
	}
};
function titleSlideAuthor(author) {
	if (presentation.titleSlide.authorCalled) {
		presentation.load = false;
		alert("Title Slide Author Error:\nYou have designated an author name for the title slide more than once.");
	} else {
		presentation.titleSlide.author = author;
		presentation.titleSlide.authorCalled = true;
	}
};
//For x and y positions, a negative number will indicate the distance from the right or bottom
function addPoint(slide, str, colour, font) {
	if (slide > presentation.slides.length) {
		presentation.load = false;
		alert("Point Error:\nYou have created a point for a slide you have not yet created.\nIt is best practice to create all slides before all other content.")
	} else if (presentation.slides[slide-1].titleSlide) {
		presentation.load = false;
		alert("Title Slide Error:\nYou have added a point to the title slide, which does not contain content.");
	} else {
		if (!font) {
			font = "Arial";
		}
		if (!colour) {
			if (presentation.bkgcolour == "black") {
				colour = "white";
			} else {
				colour = "black";
			}
		}
		presentation.slides[slide-1].content.push({
			type: "point",
			point: str,
			font: font,
			colour: colour
		});
	}
};
function addLinkPoint(slide, str, uri, font) {
	if (slide > presentation.slides.length) {
		presentation.load = false;
		alert("Paragraph Error:\nYou have created a paragraph for a slide you have not yet created.\nIt is best practice to create all slides before all other content.")
	} else if (presentation.slides[slide-1].titleSlide) {
		presentation.load = false;
		alert("Title Slide Error:\nYou have added a paragraph to the title slide, which does not contain content.");
	} else {
		if (!font) {
			font = "Arial";
		}
		presentation.slides[slide-1].content.push({
			type: "linkpoint",
			point: str,
			font: font,
			uri: uri
		});
	}
}
function addParagraph(slide, str, colour, font) {
	if (slide > presentation.slides.length) {
		presentation.load = false;
		alert("Paragraph Error:\nYou have created a paragraph for a slide you have not yet created.\nIt is best practice to create all slides before all other content.")
	} else if (presentation.slides[slide-1].titleSlide) {
		presentation.load = false;
		alert("Title Slide Error:\nYou have added a paragraph to the title slide, which does not contain content.");
	} else {
		if (!font) {
			font = "Arial";
		}
		if (!colour) {
			if (presentation.bkgcolour == "black") {
				colour = "white";
			} else {
				colour = "black";
			}
		}
		presentation.slides[slide-1].content.push({
			type: "para",
			para: str,
			font: font,
			colour: colour
		});
	}
};
function addImage(slide, uri, x, y, w, h) {
	if (slide > presentation.slides.length) {
		presentation.load = false;
		alert("Image Error:\nYou have added an image to a slide you have not yet created.\nIt is best practice to create all slides before all other content.")
	} else if (presentation.slides[slide-1].titleSlide) {
		presentation.load = false;
		alert("Title Slide Error:\nYou have added an image to the title slide, which does not contain content.");
	} else {
		presentation.slides[slide-1].imgNum++;
		imgSpan.innerHTML += "<img id='img" + slide + "." + presentation.slides[slide-1].imgNum + "' src='" + uri + "'/>";
		presentation.slides[slide-1].content.push({
			type: "img",
			x: x,
			y: y,
			w: w,
			h: h
		});
	}
};
function addVideo(slide, uri, x, y, w, h) {
	if (slide > presentation.slides.length) {
		presentation.load = false;
		alert("Video Error:\nYou have added a video to a slide you have not yet created.\nIt is best practice to create all slides before all other content.")
	} else if (presentation.slides[slide-1].titleSlide) {
		presentation.load = false;
		alert("Title Slide Error:\nYou have added a video to the title slide, which does not contain content.");
	} else {
		presentation.slides[slide-1].videoNum++;
		videoSpan.innerHTML += "<video id='video" + slide + "." + presentation.slides[slide-1].videoNum + "' src='" + uri + "'/>";
		presentation.slides[slide-1].content.push({
			type: "video",
			x: x,
			y: y,
			w: w,
			h: h
		});
	}
};
function addSubheading(slide, str, colour, font) {
	if (slide > presentation.slides.length) {
		presentation.load = false;
		alert("Subheading Error:\nYou have created a subheading for a slide you have not yet created.\nIt is best practice to create all slides before all other content.")
	} else if (presentation.slides[slide-1].titleSlide) {
		presentation.load = false;
		alert("Title Slide Error:\nYou have added a heading to the title slide, which does not contain content.");
	} else if (str.length > 34) {
		presentation.load = false;
		alert("Subheading Error:\nA subheading is too long, as it will take up more than one line.")
	} else {
		if (!font) {
			font = presentation.slides[slide-1].headingColour;
		}
		if (!colour) {
			if (presentation.bkgcolour == "black") {
				colour = "white";
			} else {
				colour = "black";
			}
		}
		presentation.slides[slide-1].content.push({
			type: "subh",
			subh: str,
			colour: colour,
			font: font
		});
	}
};
function addLine(slide, x1, y1, x2, y2, colour, width) {
	if (slide > presentation.slides.length) {
		presentation.load = false;
		alert("Shape Error:\nYou have created a line for a slide you have not yet created.\nIt is best practice to create all slides before all other content.")
	} else if (presentation.slides[slide-1].titleSlide) {
		presentation.load = false;
		alert("Title Slide Error:\nYou have added a line to the title slide, which does not contain content.");
	} else {
		presentation.slides[slide-1].content.push({
			type: "line",
			position: {
				x1: x1,
				y1: y1,
				x2: x2,
				y2: y2
			},
			colour: colour,
			width: width
		});
	}
};
function addAlphaLine(slide, x1, y1, x2, y2, r, g, b, a, width) {
	if (slide > presentation.slides.length) {
		presentation.load = false;
		alert("Shape Error:\nYou have created a line for a slide you have not yet created.\nIt is best practice to create all slides before all other content.")
	} else if (presentation.slides[slide-1].titleSlide) {
		presentation.load = false;
		alert("Title Slide Error:\nYou have added a line to the title slide, which does not contain content.");
	} else {
		presentation.slides[slide-1].content.push({
			type: "alphaline",
			position: {
				x1: x1,
				y1: y1,
				x2: x2,
				y2: y2
			},
			r: r,
			g: g,
			b: b,
			a: a,
			width: width
		});
	}
};
function addRect(slide, x, y, w, h, colour) {
	if (slide > presentation.slides.length) {
		presentation.load = false;
		alert("Shape Error:\nYou have created a rectangle for a slide you have not yet created.\nIt is best practice to create all slides before all other content.")
	} else if (presentation.slides[slide-1].titleSlide) {
		presentation.load = false;
		alert("Title Slide Error:\nYou have added a rectangle to the title slide, which does not contain content.");
	} else {
		presentation.slides[slide-1].content.push({
			type: "rect",
			position: {
				x: x,
				y: y,
				w: w,
				h: h
			},
			colour: colour
		});
	}
};
function addAlphaRect(slide, x, y, w, h, r, g, b, a) {
	if (slide > presentation.slides.length) {
		presentation.load = false;
		alert("Shape Error:\nYou have created a rectangle for a slide you have not yet created.\nIt is best practice to create all slides before all other content.")
	} else if (presentation.slides[slide-1].titleSlide) {
		presentation.load = false;
		alert("Title Slide Error:\nYou have added a rectangle to the title slide, which does not contain content.");
	} else {
		presentation.slides[slide-1].content.push({
			type: "alpharect",
			position: {
				x: x,
				y: y,
				w: w,
				h: h
			},
			r: r,
			g: g,
			b: b,
			a: a
		});
	}
};
//Just a warning that a circle is the outline of a disc
function addCircle(slide, Ox, Oy, radius, colour, lineWidth) {
	if (slide > presentation.slides.length) {
		presentation.load = false;
		alert("Shape Error:\nYou have created a circle for a slide you have not yet created.\nIt is best practice to create all slides before all other content.")
	} else if (presentation.slides[slide-1].titleSlide) {
		presentation.load = false;
		alert("Title Slide Error:\nYou have added a circle to the title slide, which does not contain content.");
	} else {
		presentation.slides[slide-1].content.push({
			type: "circle",
			Ox: Ox,
			Oy: Oy,
			colour: colour,
			radius: radius,
			lineWidth: lineWidth
		});
	}
};
function addAlphaCircle(slide, Ox, Oy, radius, r, g, b, a, lineWidth) {
	if (slide > presentation.slides.length) {
		presentation.load = false;
		alert("Shape Error:\nYou have created a circle for a slide you have not yet created.\nIt is best practice to create all slides before all other content.")
	} else if (presentation.slides[slide-1].titleSlide) {
		presentation.load = false;
		alert("Title Slide Error:\nYou have added a circle to the title slide, which does not contain content.");
	} else {
		presentation.slides[slide-1].content.push({
			type: "alphacircle",
			Ox: Ox,
			Oy: Oy,
			r: r,
			g: g,
			b: b,
			a: a,
			radius: radius,
			lineWidth: lineWidth
		});
	}
};
//Just a warning that a disc is a filled-in circle
function addDisc(slide, Ox, Oy, radius, colour) {
	if (slide > presentation.slides.length) {
		presentation.load = false;
		alert("Shape Error:\nYou have created a disc for a slide you have not yet created.\nIt is best practice to create all slides before all other content.")
	} else if (presentation.slides[slide-1].titleSlide) {
		presentation.load = false;
		alert("Title Slide Error:\nYou have added a disc to the title slide, which does not contain content.");
	} else {
		presentation.slides[slide-1].content.push({
			type: "disc",
			Ox: Ox,
			Oy: Oy,
			colour: colour,
			radius: radius
		});
	}
};
function addAlphaDisc(slide, Ox, Oy, radius, r, g, b, a) {
	if (slide > presentation.slides.length) {
		presentation.load = false;
		alert("Shape Error:\nYou have created a disc for a slide you have not yet created.\nIt is best practice to create all slides before all other content.")
	} else if (presentation.slides[slide-1].titleSlide) {
		presentation.load = false;
		alert("Title Slide Error:\nYou have added a disc to the title slide, which does not contain content.");
	} else {
		presentation.slides[slide-1].content.push({
			type: "alphadisc",
			Ox: Ox,
			Oy: Oy,
			r: r,
			g: g,
			b: b,
			a: a,
			radius: radius
		});
	}
};
function addSector(slide, Ox, Oy, startAngle, endAngle, radius, colour) {
	if (slide > presentation.slides.length) {
		presentation.load = false;
		alert("Shape Error:\nYou have created a sector for a slide you have not yet created.\nIt is best practice to create all slides before all other content.")
	} else if (presentation.slides[slide-1].titleSlide) {
		presentation.load = false;
		alert("Title Slide Error:\nYou have added a sector to the title slide, which does not contain content.");
	} else {
		presentation.slides[slide-1].content.push({
			type: "sector",
			Ox: Ox,
			Oy: Oy,
			colour: colour,
			radius: radius,
			startAngle: startAngle,
			endAngle: endAngle
		});
	}
};
function addAlphaSector(slide, Ox, Oy, startAngle, endAngle, radius, r, g, b, a) {
	if (slide > presentation.slides.length) {
		presentation.load = false;
		alert("Shape Error:\nYou have created a sector for a slide you have not yet created.\nIt is best practice to create all slides before all other content.")
	} else if (presentation.slides[slide-1].titleSlide) {
		presentation.load = false;
		alert("Title Slide Error:\nYou have added a sector to the title slide, which does not contain content.");
	} else {
		presentation.slides[slide-1].content.push({
			type: "alphasector",
			Ox: Ox,
			Oy: Oy,
			r: r,
			g: g,
			b: b,
			radius: radius,
			startAngle: startAngle,
			endAngle: endAngle
		});
	}
};
//Use like this: addPolygon(slide, colour, sides, xf, yf, xf+1, yf+1, ..., xl, yl);
function addPolygon(slide, colour, sides) {
	if (slide > presentation.slides.length) {
		presentation.load = false;
		alert("Shape Error:\nYou have created a polygon for a slide you have not yet created.\nIt is best practice to create all slides before all other content.")
	} else if (presentation.slides[slide-1].titleSlide) {
		presentation.load = false;
		alert("Title Slide Error:\nYou have added a polygon to the title slide, which does not contain content.");
	} else {
		var x = [];
		var y = [];
		for (var i = 0; i < sides; i++) {
			x.push(arguments[i*2 + 3]);
			y.push(arguments[i*2 + 4]);
		}
		presentation.slides[slide-1].content.push({
			type: "polygon",
			colour: colour,
			x: x,
			y: y
		});
	}
};
//Use like this: addAlphaPolygon(slide, sides, r, g, b, a, xf, yf, xf+1, yf+1, ..., xl, yl);
function addAlphaPolygon(slide, sides, r, g, b, a) {
	if (slide > presentation.slides.length) {
		presentation.load = false;
		alert("Slide Error:\nYou have created a polygon for a slide you have not yet created.\nIt is best practice to create all slides before all other content.")
	} else if (presentation.slides[slide-1].titleSlide) {
		presentation.load = false;
		alert("Title Slide Error:\nYou have added a polygon to the title slide, which does not contain content.");
	} else {
		var x = [];
		var y = [];
		for (var i = 0; i < sides; i++) {
			x.push(arguments[i*2 + 3]);
			y.push(arguments[i*2 + 4]);
		}
		presentation.slides[slide-1].content.push({
			type: "polygon",
			r: r,
			g: g,
			b: b,
			a: a,
			x: x,
			y: y
		});
	}
};
function addLinkHotspot (slide, startX, endX, startY, endY, uri) {
	if (slide > presentation.slides.length) {
		presentation.load = false;
		alert("Slide Error:\nYou have created a link hotspot for a slide you have not yet created.\nIt is best practice to create all slides before all other content.");
	} else if (presentation.slides[slide-1].titleSlide) {
		presentation.load = false;
		alert("Title Slide Error:\nYou have created a link hotspot for a title slide, which does not contain content.");
	}
	presentation.slides[slide-1].linkHotspots.push({
		startX: startX,
		startY: startY,
		endX: endX,
		endY: endY,
		uri: uri
	});
};
function heading(slide, heading, colour, font) {
	if (slide > presentation.slides.length) {
		presentation.load = false;
		alert("Slide Error:\nYou have created a slide heading for a slide you have not yet created.\nIt is best practice to create all slides before all other content.");
	} else if (presentation.slides[slide-1].titleSlide) {
		presentation.load = false;
		alert("Heading Error:\nYou have created a heading for a title slide.\nDesignate a title slide's heading using the JS function titleSlideHeading().\nNote: If you are not sure about this, ask the person who created the presentation.");
	} else if (presentation.slides[slide-1].headingChanged) {
		presentation.load = false;
		alert("Slide Error:\nYou have created a heading for a slide more than once.");
	} else {
		presentation.slides[slide-1].heading = heading;
		presentation.slides[slide-1].headingChanged = true;
		if (colour) {
			presentation.slides[slide-1].headingColour = colour;
		}
		if (font) {
			presentation.slides[slide-1].headingFont = font;
		}
	}
};
function addSlide(times) {
	if (times) {
		if (presentation.bkgcolour == "black") {
			for (var i = 0; i < times; i++) {
				presentation.slides.push({
					heading: "My Heading",
					headingColour: "palegoldenrod",
					headingFont: "50px Arial",
					content: [],
					linkHotspots: [],
					headingChanged: false,
					currY: innerHeight/5,
					titleSlide: false,
					imgNum: 0,
					currImgNum: 0,
					videoNum: 0,
					currVideoNum: 0
				});
			}
		} else {
			for (var i = 0; i < times; i++) {
				presentation.slides.push({
					heading: "My Heading",
					headingColour: "black",
					headingFont: "50px Arial",
					content: [],
					linkHotspots: [],
					headingChanged: false,
					currY: innerHeight/5,
					titleSlide: false,
					imgNum: 0,
					currImgNum: 0,
					videoNum: 0,
					currVideoNum: 0
				});
			}
		}
	} else {
		if (presentation.bkgcolour == "black") {
			presentation.slides.push({
				heading: "My Heading",
				headingColour: "palegoldenrod",
				headingFont: "50px Arial",
				content: [],
				linkHotspots: [],
				headingChanged: false,
				currY: innerHeight/5,
				titleSlide: false,
				imgNum: 0,
				currImgNum: 0,
				videoNum: 0,
				currVideoNum: 0
			});
		} else {
			presentation.slides.push({
				heading: "My Heading",
				headingColour: "black",
				headingFont: "50px Arial",
				content: [],
				linkHotspots: [],
				headingChanged: false,
				currY: innerHeight/5,
				titleSlide: false,
				imgNum: 0,
				currImgNum: 0,
				videoNum: 0,
				currVideoNum: 0
			});
		}
	}
};
function background(color) {
	if (presentation.backgroundCalled) {
		presentation.load = false;
		alert("Background Error:\nMore than one colour for the background has been declared.")
	} else {
		presentation.backgroundCalled = true;
		presentation.bkgcolour = color;
	}
};
function theme(theme) {
	if (presentation.themeCalled) {
		presentation.load = false;
		alert("Theme Error:\nMore than one theme has been specified.");
	} else {
		presentation.themeCalled = true;
		presentation.theme = theme;
	}
	if (theme == "glow orange") {
		presentation.currThemeColour.r = 260;
		presentation.currThemeColour.g = 164;
		presentation.currThemeColour.b = 98;
	} else if (theme == "glow blue") {
		presentation.currThemeColour.r = 106;
		presentation.currThemeColour.g = 247;
		presentation.currThemeColour.b = 250;
	}
	if (theme == "radiance") {
		imgSpan.innerHTML += "<img src='" + presentation.themeLocation + "/radiance.png' id='themeimg'></img>";
	} else if (theme == "sparkle") {
		imgSpan.innerHTML += "<img src='" + presentation.themeLocation + "/sparkle.png' id='themeimg'></img>";
	} else if (theme == "slice") {
		imgSpan.innerHTML += "<img src='" + presentation.themeLocation + "/slice.png' id='themeimg'></img>";
	} else if (theme == "dream") {
		imgSpan.innerHTML += "<img src='" + presentation.themeLocation + "/dream.png' id='themeimg'></img>";
	} else if (theme == "space") {
		imgSpan.innerHTML += "<img src='" + presentation.themeLocation + "/space.png' id='themeimg'></img>";
	} else if (theme == "bubbles") {
		imgSpan.innerHTML += "<img src='" + presentation.themeLocation + "/bubbles.png' id='themeimg'></img>";
	} else if (theme == "quote") {
		imgSpan.innerHTML += "<img src='" + presentation.themeLocation + "/quote.png' id='themeimg'></img>";
	} else if (theme == "yosemite") {
		imgSpan.innerHTML += "<img src='" + presentation.themeLocation + "/yosemitecompressed.png' id='compressedthemeimg'></img>";
		imgSpan.innerHTML += "<img src='" + presentation.themeLocation + "/yosemite.png' id='themeimg'></img>";
	} else if (theme == "coast") {
		imgSpan.innerHTML += "<img src='" + presentation.themeLocation + "/coastcompressed.png' id='compressedthemeimg'></img>";
		imgSpan.innerHTML += "<img src='" + presentation.themeLocation + "/coast.jpg' id='themeimg'></img>";
	} else if (theme == "iceland") {
		imgSpan.innerHTML += "<img src='" + presentation.themeLocation + "/iceland.jpg' id='themeimg'></img>";
	} else if (theme == "waterfall") {
		imgSpan.innerHTML += "<img src='" + presentation.themeLocation + "/waterfall.jpg' id='themeimg'></img>";
	} else {
		return 0;
	}
	if (!presentation.themeLocationCalled) {
		presentation.load = false;
		alert("Theme location error:\nYou have not specified a theme location before calling the theme function.");
	}
}
//Specific y margins are not good because they are not responsive and may render disastorous on smaller devices.
function changeMargin(y) {
	if (presentation.changeMarginCalled) {
		presentation.load = false;
		alert("Margin Error:\nMore than one margin has been designated.")
	} else {
		presentation.changeMarginCalled = true;
		presentation.margin = y;
	}
};

//Enter where the themes are stored. Use this function before you designate a theme.
function themeLocation(location) {
	if (presentation.themeLocationCalled) {
		presentation.load = false;
		alert("Theme Location Error:\nMore than one location for the theme has been designated.")
	} else {
		presentation.themeLocationCalled = true;
		presentation.themeLocation = location;
	}
};

function noTitleSlideAuthor() {
	if (presentation.noTitleSlideAuthorCalled) {
		presentation.load = false;
		alert("Title Slide Error:\nYou have declared to not display a title slide author more then once.")
	} else {
		presentation.noTitleSlideAuthorCalled = true;
		titleSlideAuthor("");
	}
};

function draw() {
	if (!presentation.end && presentation.load) {
		if (!presentation.changeMarginCalled) {
			presentation.margin = Math.round(innerWidth/34);
		}
		presentation.frametime++;
		presentation.currImgNum = presentation.lastImgNum;
		presentation.currVideoNum = presentation.lastVideoNum;
		presentation.currSoundNum = presentation.lastSoundNum;
		//Background/Theme
		if (presentation.backgroundCalled && presentation.themeCalled) {
			presentation.load = false;
			alert("Background/Theme Error:\nYou have specified a background colour and a theme.\nPlease only specify one of these.");
		} else if (presentation.backgroundCalled) {
			ctx.fillStyle = presentation.bkgcolour;
			ctx.fillRect(0,0,innerWidth,innerHeight);
		} else if (presentation.themeCalled) {
			switch(presentation.theme) {
				/*-----Add your own theme here-----*/
				case "default":
					ctx.fillStyle = "white";
					ctx.fillRect(0,0,innerWidth,innerHeight);
					break;
				case "default black":
					ctx.fillStyle = "black";
					ctx.fillRect(0,0,innerWidth,innerHeight);
					break;
				case "bluestriped":
					ctx.fillStyle = "aquamarine";
					ctx.fillRect(0, 0, innerWidth, innerHeight);
					ctx.fillStyle = "white";
					ctx.fillRect(0, Math.round(innerHeight/3), innerWidth, Math.round(innerHeight/3));
					break;
				case "sidebar":
					ctx.fillStyle = "palegoldenrod";
					ctx.fillRect(0, 0, innerWidth, innerHeight);
					ctx.fillStyle = "grey";
					ctx.fillRect(Math.round(innerWidth*5/6), 0, Math.round(innerWidth/6), innerHeight);
					ctx.fillStyle = "white";
					ctx.fillRect(Math.round(innerWidth*5/6), 0, Math.round(innerWidth/30), innerHeight);
					break;
				case "glow orange":
					if (presentation.frametime % 20 == 0) {
						if (presentation.currThemeColour.r == 240) {
							presentation.direction = "up";
						} else if (presentation.currThemeColour.r == 260) {
							presentation.direction = "down";
						}
						if (presentation.direction == "up") {
							presentation.currThemeColour.r++;
							presentation.currThemeColour.g++;
							presentation.currThemeColour.b++;
						} else {
							presentation.currThemeColour.r--;
							presentation.currThemeColour.g--;
							presentation.currThemeColour.b--;
						}
					}
					ctx.fillStyle = "rgb(" + presentation.currThemeColour.r + ", " + presentation.currThemeColour.g + ", " + presentation.currThemeColour.b + ")";
					ctx.fillRect(0, 0, innerWidth, innerHeight);
					break;
				case "glow blue":
					if (presentation.frametime % 20 == 0) {
						if (presentation.currThemeColour.r == 60) {
							presentation.direction = "up";
						} else if (presentation.currThemeColour.r == 110) {
							presentation.direction = "down";
						}
						if (presentation.direction == "up") {
							presentation.currThemeColour.r++;
							presentation.currThemeColour.g++;
							presentation.currThemeColour.b++;
						} else {
							presentation.currThemeColour.r--;
							presentation.currThemeColour.g--;
							presentation.currThemeColour.b--;
						}
					}
					ctx.fillStyle = "rgb(" + presentation.currThemeColour.r + ", " + presentation.currThemeColour.g + ", " + presentation.currThemeColour.b + ")";
					ctx.fillRect(0, 0, innerWidth, innerHeight);
					break;
				case "orange border":
					for (i = 0; i < 21; i++) {
						ctx.fillStyle = "rgb(" + (255 - i) + ", 160, 120)";
						ctx.fillRect(i, i, innerWidth-1, innerHeight-1);
					}
					break;
				case "radiance":
				case "sparkle":
				case "slice":
				case "dream":
				case "bubbles":
				case "quote":
				case "iceland":
				case "waterfall":
					ctx.drawImage(document.getElementById("themeimg"), 0, 0, innerWidth, innerHeight);
					break;
				case "yosemite":
				case "coast":
					ctx.drawImage(document.getElementById("compressedthemeimg"), 0, 0, innerWidth, innerHeight);
					ctx.drawImage(document.getElementById("themeimg"), 0, 0, innerWidth, innerHeight);
					break;
				case "space":
					ctx.fillStyle = "#133177";
					ctx.fillRect(0, 0, innerWidth, innerHeight);
					ctx.drawImage(document.getElementById("themeimg"), 0, 0, innerWidth, innerWidth/1366*768);
					break;
				default:
					presentation.load = false;
					alert("Theme Error:\n'" + presentation.theme + "' is not one of the themes.");
			}
		}
		//Shows slide number
		ctx.font = Math.round(innerWidth/50+5).toString() + "px Comic Sans MS";
		((presentation.bkgcolour == "black" || presentation.themeCalled) && (presentation.theme != "default" && presentation.theme != "slice" && presentation.theme != "sidebar")) ? ctx.fillStyle = "white" : ctx.fillStyle = "black";
		ctx.textAlign = "right";
		if (presentation.slideNums) {
			ctx.fillText(presentation.slide + "/" + presentation.slides.length, innerWidth - 30, 45);
		} else {
			ctx.fillText(((presentation.slide == presentation.slides.length) ? "No" : (presentation.slides.length - presentation.slide).toString()) + ((presentation.slide == presentation.slides.length - 1) ? " slide " : " slides ") + "to go", innerWidth - 30, 45);
		}
		if (!presentation.fullscreen && presentation.slide == 1) {
			ctx.font = Math.round(innerWidth/50 + 5).toString() + "px Comic Sans MS";
			ctx.fillStyle = presentation.titleSlide.colour;
			ctx.textAlign = "center";
			ctx.fillText("Click to enter fullscreen mode", innerWidth/2, innerHeight/4*3);
		}
		if (presentation.slides[presentation.slide-1].titleSlide) {
			//Title Slide content
			ctx.font = Math.round(innerWidth/13).toString() + "px " + presentation.titleSlide.font;
			ctx.fillStyle = presentation.titleSlide.colour;
			ctx.textAlign = "center";
			ctx.fillText(presentation.titleSlide.heading, innerWidth/2, innerHeight/3);
			if (presentation.titleSlide.author != "") {
				ctx.font = Math.round(innerWidth/22).toString() + "px " + presentation.titleSlide.font;
				ctx.fillText("by " + presentation.titleSlide.author, innerWidth/2, innerHeight/5*3);
			}
		} else {
			//Headings
			ctx.font = Math.round(innerWidth/27).toString() + "px " + presentation.slides[presentation.slide-1].headingFont;
			ctx.fillStyle = presentation.slides[presentation.slide-1].headingColour;
			ctx.textAlign = "center";
			ctx.fillText(presentation.slides[presentation.slide-1].heading, innerWidth/2, innerHeight/11);
			//Draw content
			presentation.slides[presentation.slide-1].currY = innerHeight/5;
			presentation.slides[presentation.slide-1].currImgNum = 0;
			presentation.slides[presentation.slide-1].currVideoNum = 0;
			presentation.slides[presentation.slide-1].currSoundNum = 0;
			for (var i = 0; i < presentation.slides[presentation.slide-1].content.length; i++) {
				content = presentation.slides[presentation.slide-1].content[i];
				switch (content.type) {
					case "subh":
						ctx.font = Math.round(innerWidth/28).toString() + "px " + content.font;
						ctx.fillStyle = content.colour;
						ctx.textAlign = "left";
						ctx.fillText(content.subh, presentation.margin, presentation.slides[presentation.slide-1].currY);
						presentation.slides[presentation.slide-1].currY += Math.round(innerWidth/28) + 5;
						break;
					case "point":
						ctx.font = Math.round(innerWidth/30).toString() + "px " + content.font;
						ctx.textAlign = "left";
						ctx.beginPath();
						ctx.fillStyle = content.colour;
						ctx.arc(presentation.margin, presentation.slides[presentation.slide-1].currY-Math.round(innerWidth/30)/3, Math.round(innerWidth/30)/9, 0, 2 * Math.PI);
						ctx.closePath();
						ctx.fill();
						var lastEndCharIndex = 0;
						for (var i = 0; i < Math.ceil(content.point.length/45); i++) {
							var spaceReached = false;
							var endCharIndex = (i+1)*45;
							while (!spaceReached && i != Math.ceil(content.point.length/45)-1) {
								if (content.point.substring(endCharIndex, endCharIndex+1) == " ") {
									spaceReached = true;
								}
								endCharIndex++;
							}
							ctx.fillText(content.point.substring(lastEndCharIndex, endCharIndex), presentation.margin + Math.round(innerWidth/30)*4/9, presentation.slides[presentation.slide-1].currY);
							lastEndCharIndex = endCharIndex;
							presentation.slides[presentation.slide-1].currY += Math.round(innerWidth/30) + 5;
						}
						break;
					case "linkpoint":
						ctx.font = Math.round(innerWidth/30).toString() + "px " + content.font;
						ctx.textAlign = "left";
						ctx.beginPath();
						ctx.fillStyle = "lightblue";
						ctx.arc(presentation.margin, presentation.slides[presentation.slide-1].currY-Math.round(innerWidth/30)/3, Math.round(innerWidth/30)/9, 0, 2 * Math.PI);
						ctx.closePath();
						ctx.fill();
						var lastEndCharIndex = 0;
						content.startY = presentation.slides[presentation.slide-1].currY - Math.round(innerWidth/30);
						for (var i = 0; i < Math.ceil(content.point.length/45); i++) {
							var spaceReached = false;
							var endCharIndex = (i+1)*45;
							while (!spaceReached && i != Math.ceil(content.point.length/45)-1) {
								if (content.point.substring(endCharIndex, endCharIndex+1) == " ") {
									spaceReached = true;
								}
								endCharIndex++;
							}
							ctx.fillText(content.point.substring(lastEndCharIndex, endCharIndex), presentation.margin + Math.round(innerWidth/30)*4/9, presentation.slides[presentation.slide-1].currY);
							lastEndCharIndex = endCharIndex;
							presentation.slides[presentation.slide-1].currY += Math.round(innerWidth/30) + 5;
						}
						content.endY = presentation.slides[presentation.slide-1].currY - Math.round(innerWidth/30);
						break;
					case "para":
						ctx.font = Math.round(innerWidth/30).toString() + "px " + content.font;
						ctx.fillStyle = content.colour;
						ctx.textAlign = "left";
						var lastEndCharIndex = 0;
						for (var i = 0; i < Math.ceil(content.para.length/45); i++) {
							var spaceReached = false;
							var endCharIndex = (i+1)*45;
							while (!spaceReached && i != Math.ceil(content.para.length/45)-1) {
								if (content.para.substring(endCharIndex, endCharIndex+1) == " ") {
									spaceReached = true;
								}
								endCharIndex++;
							}
							ctx.fillText(content.para.substring(lastEndCharIndex, endCharIndex), presentation.margin + Math.round(innerWidth/30)*4/9, presentation.slides[presentation.slide-1].currY);
							lastEndCharIndex = endCharIndex;
							presentation.slides[presentation.slide-1].currY += Math.round(innerWidth/30) + 5;
						}
						break;
					case "img":
						presentation.slides[presentation.slide-1].currImgNum++;
						var imgref = document.getElementById("img" + presentation.slide + "." + presentation.slides[presentation.slide-1].currImgNum);
						ctx.drawImage(imgref, (content.x < 0)?innerWidth-Math.abs(content.x):content.x, (content.y < 0)?innerHeight-Math.abs(content.y):content.y, content.w, content.h);
						break;
					case "video":
						presentation.slides[presentation.slide-1].currVideoNum++;
						var videoref = document.getElementById("video" + presentation.slide + "." + presentation.slides[presentation.slide-1].currVideoNum);
						ctx.drawImage(videoref, (content.x < 0)?innerWidth-Math.abs(content.x):content.x, (content.y < 0)?innerHeight-Math.abs(content.y):content.y, content.w, content.h);
						break;
					case "line":
						ctx.beginPath();
						ctx.strokeStyle = content.colour;
						ctx.lineWidth = (content.width)?content.width:1;
						ctx.moveTo((content.position.x1 < 0)?innerWidth-Math.abs(content.position.x1):content.position.x1, (content.position.y1 < 0)?innerWidth-Math.abs(content.position.y1):content.position.y1);
						ctx.lineTo((content.position.x2 < 0)?innerWidth-Math.abs(content.position.x2):content.position.x2, (content.position.y2 < 0)?innerWidth-Math.abs(content.position.y2):content.position.y2);
						ctx.closePath();
						ctx.stroke();
						break;
					case "alphaline":
						ctx.beginPath();
						ctx.strokeStyle = "rgba(" + content.r + ", " + content.g + ", " + content.b + ", " + content.a + ")";
						ctx.lineWidth = (content.width)?content.width:1;
						ctx.moveTo((content.position.x1 < 0)?innerWidth-Math.abs(content.position.x1):content.position.x1, (content.position.y1 < 0)?innerWidth-Math.abs(content.position.y1):content.position.y1);
						ctx.lineTo((content.position.x2 < 0)?innerWidth-Math.abs(content.position.x2):content.position.x2, content.position.y2);
						ctx.closePath();
						ctx.stroke();
						break;
					case "rect":
						ctx.fillStyle = content.colour;
						ctx.fillRect((content.position.x < 0)?innerWidth-Math.abs(content.position.x):content.position.x, (content.position.y < 0)?innerWidth-Math.abs(content.position.y):content.position.y, content.position.w, content.position.h);
						break;
					case "alpharect":
						ctx.fillStyle = "rgba(" + content.r + ", " + content.g + ", " + content.b + ", " + content.a + ")";
						ctx.fillRect((content.position.x < 0)?innerWidth-Math.abs(content.position.x):content.position.x, (content.position.y < 0)?innerWidth-Math.abs(content.position.y):content.position.y, content.position.w, content.position.h);
						break;
					case "polygon":
						ctx.beginPath();
						ctx.fillStyle = content.colour;
						ctx.moveTo((content.x[0] < 0)?innerWidth-Math.abs(content.x[0]):content.x[0], (content.y[0] < 0)?innerWidth-Math.abs(content.y[0]):content.y[0]);
						for (var i = 1; i < content.x.length; i++) {
							ctx.lineTo((content.x[i] < 0)?innerWidth-Math.abs(content.x[i]):content.x[i], (content.y[i] < 0)?innerWidth-Math.abs(content.y[i]):content.y[i]);
						}
						ctx.closePath();
						ctx.fill();
						break;
					case "alphapolygon":
						ctx.beginPath();
						ctx.fillStyle = "rgba(" + content.r + ", " + content.g + ", " + content.b + ", " + content.a + ")";
						ctx.moveTo((content.x[0] < 0)?innerWidth-Math.abs(content.x[0]):content.x[0], (content.y[0] < 0)?innerWidth-Math.abs(content.y[0]):content.y[0]);
						for (var i = 1; i < content.x.length; i++) {
							ctx.lineTo((content.x[i] < 0)?innerWidth-Math.abs(content.x[i]):content.x[i], (content.y[i] < 0)?innerWidth-Math.abs(content.y[i]):content.y[i]);
						}
						ctx.closePath();
						ctx.fill();
						break;
					case "circle":
						ctx.beginPath();
						ctx.strokeStyle = content.colour;
						ctx.lineWidth = content.width;
						ctx.arc((content.Ox < 0)?innerWidth-Math.abs(content.Ox):content.Ox, (content.Oy < 0)?innerWidth-Math.abs(content.Oy):content.Oy, content.radius, 0, 2 * Math.PI);
						ctx.closePath();
						ctx.stroke();
						break;
					case "alphacircle":
						ctx.beginPath();
						ctx.strokeStyle = "rgba(" + content.r + ", " + content.g + ", " + content.b + ", " + content.a + ")";
						ctx.lineWidth = content.width;
						ctx.arc((content.Ox < 0)?innerWidth-Math.abs(content.Ox):content.Ox, (content.Oy < 0)?innerWidth-Math.abs(content.Oy):content.Oy, content.radius, 0, 2 * Math.PI);
						ctx.closePath();
						ctx.stroke();
						break;
					case "disc":
						ctx.beginPath();
						ctx.fillStyle = content.colour;
						ctx.arc((content.Ox < 0)?innerWidth-Math.abs(content.Ox):content.Ox, (content.Oy < 0)?innerWidth-Math.abs(content.Oy):content.Oy, content.radius, 0, 2 * Math.PI);
						ctx.closePath();
						ctx.fill();
						break;
					case "alphadisc":
						ctx.beginPath();
						ctx.fillStyle = "rgba(" + content.r + ", " + content.g + ", " + content.b + ", " + content.a + ")";
						ctx.arc((content.Ox < 0)?innerWidth-Math.abs(content.Ox):content.Ox, (content.Oy < 0)?innerWidth-Math.abs(content.Oy):content.Oy, content.radius, 0, 2 * Math.PI);
						ctx.closePath();
						ctx.fill();
						break;
					case "sector":
						ctx.beginPath();
						ctx.fillStyle = content.colour;
						ctx.arc((content.Ox < 0)?innerWidth-Math.abs(content.Ox):content.Ox, (content.Oy < 0)?innerWidth-Math.abs(content.Oy):content.Oy, content.radius, content.startAngle, content.endAngle);
						ctx.closePath();
						ctx.fill();
						break;
					case "alphasector":
						ctx.beginPath();
						ctx.fillStyle = "rgba(" + content.r + ", " + content.g + ", " + content.b + ", " + content.a + ")";
						ctx.arc((content.Ox < 0)?innerWidth-Math.abs(content.Ox):content.Ox, (content.Oy < 0)?innerWidth-Math.abs(content.Oy):content.Oy, content.radius, content.startAngle, content.endAngle);
						ctx.closePath();
						ctx.fill();
						break;
				}
			}
		}
	} else if (!presentation.load) {
		//Background
		ctx.fillStyle = presentation.bkgcolour;
		ctx.fillRect(0,0,innerWidth,innerHeight);
		ctx.fillStyle = presentation.bkgcolour;
		ctx.fillRect(0,0,innerWidth,innerHeight);
		ctx.font = Math.round(innerWidth/47 + 5).toString() + "px Arial";
		if (presentation.bkgcolour != "white") {
			ctx.fillStyle = "white";	
		} else {
			ctx.fillStyle = "black";
		}
		ctx.textAlign = "center";
		ctx.fillText("Sorry, this presentation has encountered an error. Ask the creator to fix the source code.", innerWidth/2, innerHeight/10);
		ctx.font = Math.round(innerWidth/90 + 5).toString() + "px Arial";
		ctx.fillText("Try pressing F12 or the equivalent button to open up the inspection console or go to presentationjs.neocities.org/implementation", innerWidth/2, innerHeight/6);
		console.log("If you still cannot fix the problem, contact me at hijacker.ho@outlook.com with the specific subject of 'PresentationJS error'");
	}
};
function customiseEndMessage(message) {
	if (presentation.customiseEndMessageCalled) {
		presentation.load = false;
		alert("End Message Error:\nThe end message has been customised more than once.")
	} else if (message.length > 33) {
		presentation.load = false;
		alert("End Message Error:\nThe end message cannot be longer than 35 characters (including spaces).");
	} else {
		presentation.customiseEndMessageCalled = true;
		presentation.endMessage = message;
	}
};
function endPresent() {
	presentation.end = true;
	if (presentation.backgroundCalled) {
		ctx.fillStyle = presentation.bkgcolour;
		ctx.fillRect(0,0,innerWidth,innerHeight);
	} else if (presentation.themeCalled) {
		switch(presentation.theme) {
			/*-----Add your own theme here-----*/
			case "default":
				ctx.fillStyle = "white";
				ctx.fillRect(0,0,innerWidth,innerHeight);
				break;
			case "default black":
				ctx.fillStyle = "black";
				ctx.fillRect(0,0,innerWidth,innerHeight);
				break;
			case "bluestriped":
				ctx.fillStyle = "aquamarine";
				ctx.fillRect(0, 0, innerWidth, innerHeight);
				ctx.fillStyle = "white";
				ctx.fillRect(0, Math.round(innerHeight/3), innerWidth, Math.round(innerHeight/3));
				break;
			case "sidebar":
				ctx.fillStyle = "palegoldenrod";
				ctx.fillRect(0, 0, innerWidth, innerHeight);
				ctx.fillStyle = "grey";
				ctx.fillRect(Math.round(innerWidth*5/6), 0, Math.round(innerWidth/6), innerHeight);
				ctx.fillStyle = "white";
				ctx.fillRect(Math.round(innerWidth*5/6), 0, Math.round(innerWidth/30), innerHeight);
				break;
			case "glow orange":
				ctx.fillStyle = "rgb(" + presentation.currThemeColour.r + ", " + presentation.currThemeColour.g + ", " + presentation.currThemeColour.b + ")";
				ctx.fillRect(0, 0, innerWidth, innerHeight);
				break;
			case "glow blue":
				ctx.fillStyle = "rgb(" + presentation.currThemeColour.r + ", " + presentation.currThemeColour.g + ", " + presentation.currThemeColour.b + ")";
				ctx.fillRect(0, 0, innerWidth, innerHeight);
				break;
			case "orange border":
				for (i = 0; i < 21; i++) {
					ctx.fillStyle = "rgb(" + (255 - i) + ", 160, 120)";
					ctx.fillRect(i, i, innerWidth-1, innerHeight-1);
				}
				break;
				case "radiance":
				case "sparkle":
				case "slice":
				case "dream":
				case "bubbles":
				case "quote":
				case "iceland":
				case "waterfall":
					ctx.drawImage(document.getElementById("themeimg"), 0, 0, innerWidth, innerHeight);
					break;
				case "yosemite":
				case "coast":
					ctx.drawImage(document.getElementById("compressedthemeimg"), 0, 0, innerWidth, innerHeight);
					ctx.drawImage(document.getElementById("themeimg"), 0, 0, innerWidth, innerHeight);
					break;
				case "space":
					ctx.fillStyle = "#133177";
					ctx.fillRect(0, 0, innerWidth, innerHeight);
					ctx.drawImage(document.getElementById("themeimg"), 0, 0, innerWidth, innerWidth/1366*768);
					break;
			default:
				presentation.load = false;
				alert("Theme Error:\n'" + presentation.theme + "' is not one of the themes.");
		}
	}
	ctx.font = Math.round(innerWidth/20).toString() + "px Comic Sans MS";
	if (presentation.bkgcolour != "white") {
		ctx.fillStyle = "white";
	} else {
		ctx.fillStyle = "black";
	}
	ctx.textAlign = "center";
	ctx.fillText(presentation.endMessage, innerWidth/2, 70);
	ctx.font = Math.round(innerWidth/30).toString() + "px Comic Sans MS";
	ctx.fillText("This is the end of the presentation.", innerWidth/2, 130);
};
document.addEventListener("fullscreenchange", function() {
	if (presentation.load) {
		presentation.fullscreen = !presentation.fullscreen;
	}
});
document.addEventListener("mozfullscreenchange", function() {
	if (presentation.load) {
		presentation.fullscreen = !presentation.fullscreen;
	}
});
document.addEventListener("webkitfullscreenchange", function() {
	if (presentation.load) {
		presentation.fullscreen = !presentation.fullscreen;
	}
});
document.addEventListener("click", function(event){
	if (presentation.load) {
		for (var i = 0; i < presentation.slides[presentation.slide-1].content.length; i++) {
			if (presentation.slides[presentation.slide-1].content[i].type == "linkpoint" && event.offsetY > presentation.slides[presentation.slide-1].content[i].startY && event.offsetY < presentation.slides[presentation.slide-1].content[i].endY && event.offsetX > presentation.margin) {
				var form = document.createElement("form");
				form.method = "GET";
				form.action = presentation.slides[presentation.slide-1].content[i].uri;
				form.target = "_blank";
				document.body.appendChild(form);
				form.submit();
			}
		}
		for (var i = 0; i < presentation.slides[presentation.slide-1].linkHotspots.length; i++) {
			if (event.offsetY > presentation.slides[presentation.slide-1].linkHotspots[i].startY && event.offsetY < presentation.slides[presentation.slide-1].linkHotspots[i].endY && event.offsetX > presentation.slides[presentation.slide-1].linkHotspots[i].startX && event.offsetX < presentation.slides[presentation.slide-1].linkHotspots[i].endX) {
				var form = document.createElement("form");
				form.method = "GET";
				form.action = presentation.slides[presentation.slide-1].linkHotspots[i].uri;
				form.target = "_blank";
				document.body.appendChild(form);
				form.submit();
			}
		}
		if (!presentation.fullscreen) {
			launchIntoFullscreen(canvas);
		} else if (presentation.slide == presentation.slides.length) {
			endPresent();
		} else {
			presentation.slide++;
		}
	}
});
document.addEventListener("keydown", function(event){
	if (presentation.load) {
		if (event.which == 39) {
			event.preventDefault();
			if (presentation.slide == presentation.slides.length) {
				endPresent();
			} else {
				presentation.slide++;
			}
		} else if (event.which == 37) {
			event.preventDefault();
			if (presentation.end) {
				presentation.end = false;
			} else if (presentation.slide != 1) {
				presentation.slide--;
			}
		}
	}
});
var presentation = {
	slides: [],
	slide: 1,
	fullscreen: false,
	endMessage: "Thank you for watching this browser presentation.",
	margin: Math.round(innerWidth/34),
	end: false,
	slideNums: true,
	framerate: 25,
	load: false,
	themeLocation: "",
	themeLocationCalled: false,
	readyCalled: false,
	backgroundCalled: false,
	themeCalled: false,
	frametime: 0,
	customiseEndMessageCalled: false,
	changeMarginCalled: false,
	titleCalled: false,
	noTitleSlideAuthorCalled: false,
	framerateCalled: false,
	bkgcolour: "white",
	theme: "",
	direction: "down",
	currThemeColour: {
		r: 0,
		g: 0,
		b: 0
	},
	titleSlide: {
		font: "Arial",
		heading: "My presentation",
		colour: "#f9ffff",
		author: "Anonymous",
		designateCalled: false,
		headingCalled: false,
		authorCalled: false
	}
};
function launchIntoFullscreen(element) {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if(element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if(element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	} else if(element.msRequestFullscreen) {
		element.msRequestFullscreen();
	} else {
		alert("Please press F11 or a similar button to go fullscreen.");
	}
};
//Framerates can either be in milliseconds or as 'high', default', 'medium' and 'low' modes
//Warning: 'high' mode is the highest quality but is not good if you have a non-advisable CPU (around an Intel i3, Intel Pentium or Atom)
function ready(framerate) {
	presentation.load = true;
	if (!document.getElementById("canvas")) {
		presentation.load = false;
		alert("Load Error:\nYou have called the ready function before the page has loaded.\nPlease call it afterwards by either inserting a <script> tag calling it\nor add an attribute to body like this: onload='ready()', and insert between the parentheses the chosen framerate (or graphics feedback speed)");
	} else {
		if (framerate) {
			if (presentation.framerateCalled) {
				presentation.load = false;
				alert("Graphics Feedback Error:\nYou have selected a framerate for the presentation more than once.");
			} else if(isNaN(framerate)) {
				switch(framerate) {
					case "high":
						presentation.framerate = 1;
						break;
					case "medium":
						presentation.framerate = 50;
						break;
					case "low":
						presentation.framerate = 100;
						break;
					case "default":
						presentation.framerate = 25;
						break;
					default:
						presentation.load = false;
						alert("Graphics Feedback Error:\nYou selected a framerate mode that does not exist, " + framerate);
				}
			} else {
				presentation.framerate = framerate;
			}
			presentation.framerateCalled = true;
		}
		if (presentation.readyCalled) {
			presentation.load = false;
			alert("Document Ready Error:\nThe document has been called to ready more than once.");
		} else {
			document.documentElement.style.overflow = 'hidden';
			document.body.scroll = "no";
			imgSpan = document.getElementById("imgSpan");
			soundSpan = document.getElementById("soundSpan");
			canvas = document.getElementById("canvas");
			ctx = canvas.getContext("2d");
			ctx.strokeStyle = "black";
			ctx.fillStyle = "black";
			presentation.readyCalled = true;
			setInterval(function(){
				canvas.width = innerWidth;
				canvas.height = innerHeight;
				draw();
				if (presentation.end) {
					endPresent();
				}
			}, presentation.framerate);
		}
	}
};