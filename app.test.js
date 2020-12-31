"use strict";

describe("testColorRandomizer", function () {
  it("should randomly change color gradient", function () {
    const colors = random_bg_color();
    expect(colors).toEqual("Canvas Color updated!");
  });
});

