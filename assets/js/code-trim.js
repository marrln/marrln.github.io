(function () {
	function trimCodeBlocks() {
		var blocks = document.querySelectorAll("code[data-trim]");
		for (var i = 0; i < blocks.length; i++) {
			var block = blocks[i];
			var lines = block.textContent.replace(/\t/g, "    ").split("\n");

			while (lines.length && lines[0].trim() === "") {
				lines.shift();
			}
			while (lines.length && lines[lines.length - 1].trim() === "") {
				lines.pop();
			}

			var minIndent = null;
			for (var j = 0; j < lines.length; j++) {
				if (lines[j].trim() === "") {
					continue;
				}
				var indent = lines[j].match(/^\s*/)[0].length;
				if (minIndent === null || indent < minIndent) {
					minIndent = indent;
				}
			}

			if (minIndent && minIndent > 0) {
				for (var k = 0; k < lines.length; k++) {
					lines[k] = lines[k].slice(minIndent);
				}
			}

			block.textContent = lines.join("\n");
		}
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", trimCodeBlocks);
	} else {
		trimCodeBlocks();
	}
})();
