/* global $ */
const api = 'https://wind-bow.gomix.me/twitch-api/streams/';
const channel = "https://www.twitch.tv/";
const callback = '?callback=?';
const streamersArr = ['Imaqtpie', 'Tanxlive', 'SingSing', 'freeCodeCamp', 'CSRuHub', 'Dafran', 'ZeeooN', 'Dekar173', 'Perrick'];


$(document).ready(() => {

    // Loop through streamers
    for (let i = 0; i < streamersArr.length; i++) {

        $.getJSON(api + streamersArr[i] + callback, (json) => {

            // If online
            if (json.stream) {
                // Sort to row one
                if (i <= 2) {
                    $(`
                        <div class="col mb-2">
                            <div class="card">
                                <img class="card-img-top img-fluid rounded" src="${json.stream.preview.medium}">
                                <div class="card-block">
                                    <h4 class="card-title">${streamersArr[i]}</h4>
                                    <p class="card-text lead">${streamersArr[i]} is currently streaming <b>${json.stream.game}</b> with <b>${json.stream.viewers} viewers</b> and an average frame rate of <b>${Math.round(parseInt(json.stream.average_fps))} FPS</b>.</p>
                                </div>
                                <div class="card-footer">
                                    <a href="${channel}${streamersArr[i]}" target="_blank"><button class="btn btn-secondary btn-block">View Live</button></a>
                                </div>
                            </div>
                        </div>
                    `).appendTo('#first-row');
                }
                // Sort to row two
                else if (i > 2 && i <= 5) {
                    $(`
                        <div class="col mb-2">
                            <div class="card">
                                <img class="card-img-top img-fluid rounded" src="${json.stream.preview.medium}">
                                <div class="card-block">
                                    <h4 class="card-title">${streamersArr[i]}</h4>
                                    <p class="card-text lead">${streamersArr[i]} is currently streaming <b>${json.stream.game}</b> with <b>${json.stream.viewers} viewers</b> and an average frame rate of <b>${Math.round(parseInt(json.stream.average_fps))} FPS</b>.</p>
                                </div>
                                <div class="card-footer">
                                    <a href="${channel}${streamersArr[i]}" target="_blank"><button class="btn btn-secondary btn-block">View Live</button></a>
                                </div>
                            </div>
                        </div>
                    `).appendTo('#second-row');
                }
                // Sort to row three
                else {
                    $(`
                        <div class="col mb-2">
                            <div class="card">
                                <img class="card-img-top img-fluid rounded" src="${json.stream.preview.medium}">
                                <div class="card-block">
                                    <h4 class="card-title">${streamersArr[i]}</h4>
                                    <p class="card-text lead">${streamersArr[i]} is currently streaming <b>${json.stream.game}</b> with <b>${json.stream.viewers} viewers</b> and an average frame rate of <b>${Math.round(parseInt(json.stream.average_fps))} FPS</b>.</p>
                                </div>
                                <div class="card-footer">
                                    <a href="${channel}${streamersArr[i]}" target="_blank"><button class="btn btn-secondary btn-block">View Live</button></a>
                                </div>
                            </div>
                        </div>
                    `).appendTo('#third-row');
                }
                // Else if streamer offline
            }
            else {
                // Sort to row one
                if (i <= 2) {
                    $(`
                        <div class="col mb-2">
                            <div class="card">
                                <img class="card-img-top img-fluid rounded" src="assets/img/offline.jpg">
                                    <div class="card-block">
                                        <h4 class="card-title">${streamersArr[i]}</h4>
                                        <p class="card-text lead">${streamersArr[i]} is not streaming at this time.</p>
                                    </div>
                                    <div class="card-footer">
                                        <button class="btn btn-secondary btn-block" disabled>View Live</button>
                                    </div>
                            </div>
                        </div>
                    `).appendTo('#first-row');
                }
                // Sort to row two
                else if (i > 2 && i <= 5) {
                    $(`
                        <div class="col mb-2">
                            <div class="card">
                                <img class="card-img-top img-fluid rounded" src="assets/img/offline.jpg">
                                    <div class="card-block">
                                        <h4 class="card-title">${streamersArr[i]}</h4>
                                        <p class="card-text lead">${streamersArr[i]} is not streaming at this time.</p>
                                    </div>
                                    <div class="card-footer">
                                        <button class="btn btn-secondary btn-block" disabled>View Live</button>
                                    </div>
                            </div>
                        </div>
                    `).appendTo('#second-row');
                }
                // Sort to row three
                else {
                    $(`
                        <div class="col mb-2">
                            <div class="card">
                                <img class="card-img-top img-fluid rounded" src="assets/img/offline.jpg">
                                    <div class="card-block">
                                        <h4 class="card-title">${streamersArr[i]}</h4>
                                        <p class="card-text lead">${streamersArr[i]} is not streaming at this time.</p>
                                    </div>
                                    <div class="card-footer">
                                        <button class="btn btn-secondary btn-block" disabled>View Live</button>
                                    </div>
                            </div>
                        </div>
                    `).appendTo('#third-row');
                }
            }
        });
    }

})
