document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("drawingCanvas");
    const ctx = canvas.getContext("2d");
    const sizeInput = document.getElementById("size");
    const colorPicker = document.getElementById("color");
    const sizePreview = document.getElementById("sizePreview");
    const prePickedColors = document.querySelectorAll(".pre-picked-color");

    let painting = false;

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function endPosition() {
        painting = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!painting) return;

        const penSize = sizeInput.value;
        const selectedColor = colorPicker.value;

        ctx.lineWidth = penSize;
        ctx.lineCap = "round";
        ctx.strokeStyle = selectedColor;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);

        sizePreview.style.width = `${penSize}px`;
        sizePreview.style.height = `${penSize}px`;
        sizePreview.style.backgroundColor = selectedColor;
    }

    sizeInput.addEventListener("input", function () {
        const penSize = sizeInput.value;
        sizePreview.style.width = `${penSize}px`;
        sizePreview.style.height = `${penSize}px`;
    });

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);

    canvas.addEventListener("mousemove", draw);

    // Set color picker value when a pre-picked color is clicked
    prePickedColors.forEach((prePickedColor) => {
        prePickedColor.addEventListener("click", function () {
            const color = this.style.backgroundColor;
            colorPicker.value = rgbToHex(color);
            sizePreview.style.backgroundColor = colorPicker.value;
        });
    });

    // Helper function to convert RGB color to HEX
    function rgbToHex(rgb) {
        // Assuming rgb is in the format "rgb(r, g, b)"
        const values = rgb.match(/\d+/g);
        const hex = values.map(value => Number(value).toString(16).padStart(2, '0')).join('');
        return `#${hex}`;
    }
});
