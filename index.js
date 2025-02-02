
        const files = {
            html: "<!-- Write your HTML code here -->",
            css: "/* Write your CSS code here */",
            js: "// Write your JavaScript code here"
        };

        const editor = document.getElementById("editor");
        const tabsContainer = document.getElementById("tabs");
        const addFileButton = document.getElementById("addFileButton");

        function updateTabs() {
            const tabs = document.querySelectorAll(".tab");
            tabs.forEach(tab => {
                tab.removeEventListener("click", handleTabClick);
                tab.addEventListener("click", handleTabClick);
            });
        }

        function handleTabClick() {
            const tabs = document.querySelectorAll(".tab");
            tabs.forEach(t => t.classList.remove("active"));
            this.classList.add("active");

            const fileType = this.getAttribute("data-file");
                      editor.setAttribute("data-file", fileType);
            editor.textContent = files[fileType] || "";
        }

        editor.addEventListener("input", function() {
            const fileType = this.getAttribute("data-file");
            files[fileType] = this.textContent;
        });

        addFileButton.addEventListener("click", function() {
            const fileName = prompt("Enter the new file name (e.g., script.js or style.css):");
            if (fileName && !files[fileName]) {
                files[fileName] = ""; // Initialize the file content
                const newTab = document.createElement("div");
                newTab.className = "tab";
                newTab.setAttribute("data-file", fileName);
                newTab.textContent = fileName;
                tabsContainer.insertBefore(newTab, addFileButton);
                updateTabs();
                newTab.click(); // Automatically switch to the new tab
            } else if (files[fileName]) {
                alert("A file with this name already exists!");
            }
        });

        function compileCode() {
            const htmlCode = files.html || "";
            const cssCode = `<style>${files.css || ""}</style>`;
            const jsCode = `<script>${files.js || ""}<\/script>`;

            const outputFrame = document.getElementById("output").contentWindow.document;
            outputFrame.open();
            outputFrame.write(htmlCode + cssCode + jsCode);
            outputFrame.close();
        }

        // Initialize the editor with the HTML content
        editor.textContent = files.html;
        updateTabs();
