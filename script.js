$(document).ready(function () {
    displayData();
    var time = new Date();
    var now = time.getHours();

    const day = time.toDateString();

    $("#currentDay").text(day);

    var allTimeSlots = $(".container").children();
    // console.log(allTimeSlots.length);
    for (let i = 0; i < allTimeSlots.length; i++) {
        var currentTimeSlot = $(allTimeSlots[i]).children()[1];
        var time = $(currentTimeSlot).attr("data-time");
        // console.log(currentTimeSlot);
        if (time > now) {
            $(currentTimeSlot).addClass("future");
        } else if (time < now) {
            $(currentTimeSlot).addClass("past");
        } else if (time == now) {
            $(currentTimeSlot).addClass("present");
        }
    }

    $(".saveBtn").click(function () {
        descEl = $(this).prev();
        desc = descEl.val();
        descId = $(descEl).attr("data-time");

        // get localStorage
        var allData = JSON.parse(localStorage.getItem("allData"));

        isDataThere = false;
        dataIndex = 0;

        if (allData === null) {
            allData = [];
        } else {
            // check to see if row excises
            dataKeys = Object.keys(allData);

            for (let i = 0; i < dataKeys.length; i++) {
                if (allData[i].row === descId) {
                    isDataThere = true;
                    dataIndex = i;
                    break;
                }
            }
        }

        if (isDataThere) {
            allData[dataIndex] = {
                row: descId,
                content: desc,
            };
        } else {
            // save an array of dicts to localstorage
            allData.push({
                row: descId,
                content: desc,
            });
        }

        allData = JSON.stringify(allData);

        localStorage.setItem("allData", allData);

        $(descEl).attr("value", desc);
        // console.log(descId);
    });

    function displayData() {
        var allData = JSON.parse(localStorage.getItem("allData"));
        if (allData) {
            dataLength = Object.keys(allData);
            for (let i = 0; i < dataLength.length; i++) {
                let target = $(`[data-time=${allData[i].row}]`);
                target.val(allData[i].content);
                console.log(target);
            }
        }
    }

    $(".clearBtn").click(function () {
        localStorage.clear();
        window.location.reload();
    });
});
