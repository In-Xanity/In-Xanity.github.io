window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
  $$("img").forEach(img => {
	  if (!img.naturalWidth && !img.naturalHeight) {
	    img.parentNode.removeChild(img);
	  }
	});
  resizeAll();
});

function fit_to_screen(i){
	i.removeAttribute("style");
	//i.setAttribute("rescaled","true");
	let winX = window.innerWidthx;
	let winY = window.innerHeight;
	//let vbar = false;
	i.dataset.limX = false;
	i.dataset.limY = false;
	i.dataset.diffX = i.naturalWidth - winX;
	i.dataset.diffY = i.naturalHeight - winY;
	if (i.dataset.diffX > 0)
	{
		i.style.maxWidth = winX + "px";
		i.dataset.limX = true;
	}
	if (i.dataset.diffY > 0)
	{
		i.style.maxHeight = winY + "px";
		i.dataset.limY = true;
	}
	i.dataset.lim1 = (i.dataset.diffX > i.dataset.diffY)? "X" : "Y";
	i.dataset.scaleLevel = i.dataset.limX + i.dataset.limY;
	/*if (document.body.scrollHeight > document.body.clientHeight) // vertical scrollbar
	{
			i.style.maxHeight = winY;
			vbar = true;
	}
	if (document.body.scrollWidth > document.body.clientWidth) // horizontal scrollbar
	{
			if (vbar) // both scrollbars
			{
					if ((document.body.scrollHeight - document.body.clientHeight) > (document.body.scrollWidth - document.body.clientWidth)) // let's see which one is bigger
					{
							i.removeAttribute("style");
							i.style.maxHeight = winY;
					}
					else
					{
							i.removeAttribute("style");
							i.style.maxWidth = winX;
					}
			}
			else
			{
					i.removeAttribute("style");
					i.style.maxWidth = winX;
			}
	}*/
}

function resizeAll(){
	$$("img").forEach(img => {
		fit_to_screen(img);
	});
}
	  
function rescale(i){
	switch(i.dataset.scaleLevel) {
		case 0:
			fit_to_screen(i);
		break;
		case 1:
			i.removeAttribute("style");
			i.dataset.limX = false;
			i.dataset.limY = false;
			i.dataset.scaleLevel = 0;
		break;
		case 2:
			switch(i.dataset.lim1) {
				case "X":
					i.style.removeProperty("maxWidth");
					i.dataset.limX = false;
				break;
				case "Y":
					i.style.removeProperty("maxHeight");
					i.dataset.limY = false;
				break;
				default:
					
			}
			i.dataset.scaleLevel = 1;
		break;
		default:
			// code block
	}
}

function $$(selector, context) {
  context = context || document;
  var elements = context.querySelectorAll(selector);
  return Array.prototype.slice.call(elements);
}
