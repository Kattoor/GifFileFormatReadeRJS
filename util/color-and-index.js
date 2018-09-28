function ColorAndIndex(color, index) {

    this.color = color;
    this.index = index;

    this.getColor = function() {
        return color;
    };

    this.getIndex = function() {
        return index;
    };
}
