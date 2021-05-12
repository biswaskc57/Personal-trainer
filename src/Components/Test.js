import React, { useEffect, useState } from "react";

var tester = "a string with a lot of words";

function getMeRepeatedWordsDetails(sentence) {
  sentence = sentence + " ";
  var regex = /[^\s]+/g;
  var regex2 = new RegExp("(" + tester.match(regex).join("|") + ")\\W", "g")
var matches = sentence.match(regex2);
  var words = {};
  for (var i = 0; i < matches.length; i++) {
    var match = matches[i].replace(/\W/g, "");
    var w = words[match];
    if (!w) words[match] = 1;
    else words[match]++;
  }
  return words;
}

console.log(getMeRepeatedWordsDetails("another string with some words"));
