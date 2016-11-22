// ==UserScript==
// @name         Display edX video transcripts in-page
// @namespace    https://georgeashworth.com
// @version      0.1
// @description  edX video transcripts will now appear in a more readable bottom pane without needing to be downloaded as a pdf or srt
// @author       George Ashworth
// @match        https://courses.edx.org/courses/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function formatMilliseconds(ms) {
        var date = new Date(parseInt(ms));
        var timeString = '';
        timeString += zeroPad(date.getUTCHours()) + ':' + zeroPad(date.getUTCMinutes()) + ':' + zeroPad(date.getUTCSeconds());
        return timeString;
    }

    function zeroPad(num) {
        return ('0' + num).slice(-2);
    }

    window.onload = function() {
        if (document.querySelector('#transcript-captions')) {
            var transcript = document.createElement('ol');
            transcript.style.listStyleType = 'none';
            transcript.style.lineHeight = 1.8;
            document.querySelectorAll('#transcript-captions li:not(.spacing)').forEach(function(li) {
                transcript.appendChild(li);
                li.textContent = formatMilliseconds(li.dataset.start) + ' - ' + li.textContent; 
            });
            document.querySelector('.vert.vert-1').appendChild(transcript);
        }
    };
})();
