// ============================================================
// Google Apps Script API
// ============================================================

const API_URL =
    "https://script.google.com/macros/s/AKfycbx8s34S2m4thfqBb9o0vd2tXmNlyX7EY30zDaD-f0VcADzUvcJXFGd8koZJ0R-0C15jRA/exec";


// ============================================================
// 第一頁：查詢頁元件
// ============================================================

const monthSelect =
    document.getElementById("monthSelect");

const playerNameInput =
    document.getElementById("playerName");

const startButton =
    document.getElementById("startButton");

const message =
    document.getElementById("message");


// ============================================================
// 頁面
// ============================================================

const searchPage =
    document.getElementById("searchPage");

const totalPage =
    document.getElementById("totalPage");

const abyssPage =
    document.getElementById("abyssPage");

const teamPage =
    document.getElementById("teamPage");

const bestTeamPage =
    document.getElementById("bestTeamPage");

const absentPage =
    document.getElementById("absentPage");

const identityPage =
    document.getElementById("identityPage");

const rankingPage =
    document.getElementById("rankingPage");

// ============================================================
// 第二頁：總達標元件
// ============================================================

const totalPlayerName =
    document.getElementById("totalPlayerName");

const totalAchieved =
    document.getElementById("totalAchieved");

const totalPossible =
    document.getElementById("totalPossible");

const nextToAbyssButton =
    document.getElementById("nextToAbyssButton");


// ============================================================
// 第三頁：深淵成績元件
// ============================================================

const abyssPlayerName =
    document.getElementById("abyssPlayerName");

const abyssDamage =
    document.getElementById("abyssDamage");

const abyssRank =
    document.getElementById("abyssRank");

const nextToTeamButton =
    document.getElementById("nextToTeamButton");


// ============================================================
// 第四頁：團本高標元件
// ============================================================

const teamPlayerName =
    document.getElementById("teamPlayerName");

const teamHighCount =
    document.getElementById("teamHighCount");

const teamTotalCount =
    document.getElementById("teamTotalCount");

const teamComment =
    document.getElementById("teamComment");

const nextToBestTeamButton =
    document.getElementById("nextToBestTeamButton");


// ============================================================
// 第五頁：最擅長團本元件
// ============================================================

const bestTeamPlayerName =
    document.getElementById("bestTeamPlayerName");

const bestTeamName =
    document.getElementById("bestTeamName");

const bestTeamRankArea =
    document.getElementById("bestTeamRankArea");

const bestTeamEventName =
    document.getElementById("bestTeamEventName");

const bestTeamRank =
    document.getElementById("bestTeamRank");

const noBestTeamMessage =
    document.getElementById("noBestTeamMessage");

const secondBestTeamArea =
    document.getElementById("secondBestTeamArea");

const secondBestTeamName =
    document.getElementById("secondBestTeamName");

const secondBestTeamEventName =
    document.getElementById("secondBestTeamEventName");

const secondBestTeamRank =
    document.getElementById("secondBestTeamRank");

const thirdBestTeamArea =
    document.getElementById("thirdBestTeamArea");

const thirdBestTeamName =
    document.getElementById("thirdBestTeamName");

const thirdBestTeamEventName =
    document.getElementById("thirdBestTeamEventName");

const thirdBestTeamRank =
    document.getElementById("thirdBestTeamRank");

const nextToAbsentButton =
    document.getElementById("nextToAbsentButton");

const bestTeamScore =
    document.getElementById("bestTeamScore");

const secondBestTeamScore =
    document.getElementById("secondBestTeamScore");

const thirdBestTeamScore =
    document.getElementById("thirdBestTeamScore");

// ============================================================
// 第六頁：缺席統計元件
// ============================================================

const absentPlayerName =
    document.getElementById("absentPlayerName");

const absentCount =
    document.getElementById("absentCount");

const absentComment =
    document.getElementById("absentComment");

const nextToIdentityButton =
    document.getElementById("nextToIdentityButton");

// ============================================================
// 第七頁：身分元件
// ============================================================

const identityPlayerName =
    document.getElementById("identityPlayerName");

const identityTitle =
    document.getElementById("identityTitle");

const identityMessage =
    document.getElementById("identityMessage");

const secretIdentityBox =
    document.getElementById("secretIdentityBox");

const secretIdentityTitle =
    document.getElementById("secretIdentityTitle");

const secretIdentityMessage =
    document.getElementById("secretIdentityMessage");

const nextToRankingButton =
    document.getElementById("nextToRankingButton");


// ============================================================
// 第八頁：排行榜元件
// ============================================================

const abyssPodium =
    document.getElementById("abyssPodium");

const teamHighPodium =
    document.getElementById("teamHighPodium");

const teamPassPodium =
    document.getElementById("teamPassPodium");

const restartButton =
    document.getElementById("restartButton");

// ============================================================
// 目前正在查看的玩家資料
// ============================================================

let currentPlayer = null;
let currentData = null;
let currentMonth = null;


// ============================================================
// 網站載入完成
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    loadMonths();

});


// ============================================================
// 取得所有月份
// ============================================================

async function loadMonths() {

    try {

        monthSelect.innerHTML =
            `<option value="">月份載入中...</option>`;

        const response =
            await fetch(API_URL);

        const data =
            await response.json();


        if (!data.success) {

            throw new Error(
                "月份取得失敗"
            );

        }


        monthSelect.innerHTML =
            `<option value="">請選擇月份</option>`;


        data.sheets.forEach(sheetName => {

            const option =
                document.createElement("option");

            option.value =
                sheetName;

            option.textContent =
                sheetName;

            monthSelect.appendChild(option);

        });

    }
    catch (error) {

        console.error(error);

        monthSelect.innerHTML =
            `<option value="">月份載入失敗</option>`;

        showMessage(
            "無法取得月份資料，請稍後再試。"
        );

    }

}


// ============================================================
// 按下「開始我的結算」
// ============================================================

startButton.addEventListener("click", async () => {

    const month =
        monthSelect.value;

    const playerName =
        playerNameInput.value.trim();


    // --------------------------------------------------------
    // 檢查月份
    // --------------------------------------------------------

    if (!month) {

        showMessage(
            "請先選擇結算月份。"
        );

        return;

    }


    // --------------------------------------------------------
    // 檢查玩家名稱
    // --------------------------------------------------------

    if (!playerName) {

        showMessage(
            "請輸入你的遊戲名稱。"
        );

        return;

    }


    try {

        startButton.disabled =
            true;

        startButton.textContent =
            "成績讀取中...";

        showMessage("");


        const url =
            API_URL +
            "?month=" +
            encodeURIComponent(month);


        const response =
            await fetch(url);

        const data =
            await response.json();


        if (!data.success) {

            throw new Error(
                data.message ||
                "資料取得失敗"
            );

        }


        // ----------------------------------------------------
        // 尋找正式族員
        // ----------------------------------------------------

        const memberResult =
            findPlayer(
                playerName,
                data.players
            );


        // ----------------------------------------------------
        // 尋找非成員
        // ----------------------------------------------------

        const nonMemberResult =
            findNonMember(
                playerName,
                data.nonMembers
            );

        // ============================================================
        // 1. 正式族員完全符合
        // ============================================================

        if (
            memberResult.type === "exact"
        ) {

            handlePlayerFound(
                memberResult.player,
                data,
                month
            );

            return;

        }


        // ============================================================
        // 2. 非成員完全符合
        // ============================================================

        if (
            nonMemberResult.type === "exact"
        ) {

            handleNonMemberFound(
                nonMemberResult.name,
                data,
                month
            );

            return;

        }


        // ============================================================
        // 3. 都沒有完全符合
        //    合併族員與非成員的模糊搜尋結果
        // ============================================================

        const suggestions =
            combineSearchSuggestions(
                memberResult,
                nonMemberResult
            );


        if (
            suggestions.length > 0
        ) {

            showCombinedSuggestions(
                suggestions,
                data,
                month
            );

            return;

        }


        // ============================================================
        // 4. 完全找不到
        // ============================================================

        showMessage(
            `找不到與「${playerName}」相近的遊戲名稱，請確認後重新輸入。`
        );
            
    }
    catch (error) {

        console.error(error);

        showMessage(
            "讀取資料時發生錯誤，請稍後再試。"
        );

    }
    finally {

        startButton.disabled =
            false;

        startButton.textContent =
            "開始我的結算";

    }

});


// ============================================================
// 顯示訊息
// ============================================================

function showMessage(text) {

    message.textContent =
        text;

}


// ============================================================
// 玩家名稱標準化
// ============================================================

function normalizeName(name) {

    return String(name)
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "");

}


// ============================================================
// 尋找玩家
// ============================================================

function findPlayer(inputName, players) {

    const input =
        normalizeName(inputName);


    // --------------------------------------------------------
    // 完全符合
    // --------------------------------------------------------

    const exactPlayer =
        players.find(row => {

            const name =
                normalizeName(row[0]);

            return name === input;

        });


    if (exactPlayer) {

        return {
            type: "exact",
            player: exactPlayer
        };

    }


    // --------------------------------------------------------
    // 模糊搜尋
    // --------------------------------------------------------

    const results =
        players

            .map(row => {

                const name =
                    String(row[0]).trim();

                return {

                    player: row,

                    name: name,

                    score: similarity(
                        input,
                        normalizeName(name)
                    )

                };

            })

            // 相似度至少 40%
            .filter(
                item =>
                    item.score >= 0.4
            )

            // 相似度由高到低
            .sort(
                (a, b) =>
                    b.score - a.score
            )

            // 最多三個
            .slice(0, 3);


    if (results.length > 0) {

        return {
            type: "similar",
            players: results
        };

    }


    return {
        type: "none"
    };

}

// ============================================================
// 尋找非成員
// ============================================================

function findNonMember(
    inputName,
    nonMembers
) {

    if (!Array.isArray(nonMembers)) {

        return {
            type: "none"
        };

    }


    const input =
        normalizeName(inputName);


    // --------------------------------------------------------
    // 完全符合
    // --------------------------------------------------------

    const exactName =
        nonMembers.find(name => {

            return (
                normalizeName(name) ===
                input
            );

        });


    if (exactName) {

        return {
            type: "exact",
            name: String(exactName).trim()
        };

    }


    // --------------------------------------------------------
    // 模糊搜尋
    // --------------------------------------------------------

    console.log("非成員原始資料：", nonMembers);

    const results =
        nonMembers

            .map(name => {

                const cleanName =
                    String(name).trim();


                return {

                    name:
                        cleanName,

                    score:
                        similarity(
                            input,
                            normalizeName(cleanName)
                        )

                };

            })

            // 相似度至少 40%
            .filter(
                item =>
                    item.score >= 0.4
            )

            // 相似度由高到低
            .sort(
                (a, b) =>
                    b.score - a.score
            )

            // 最多三個
            .slice(
                0,
                3
            );


    if (results.length > 0) {

        return {
            type: "similar",
            players: results
        };

    }


    return {
        type: "none"
    };

}

// ============================================================
// 合併族員與非成員的模糊搜尋結果
// ============================================================

function combineSearchSuggestions(
    memberResult,
    nonMemberResult
) {

    const suggestions = [];


    // --------------------------------------------------------
    // 正式族員
    // --------------------------------------------------------

    if (
        memberResult.type === "similar"
    ) {

        memberResult.players.forEach(
            item => {

                suggestions.push({

                    type:
                        "member",

                    name:
                        item.name,

                    player:
                        item.player,

                    score:
                        item.score

                });

            }
        );

    }


    // --------------------------------------------------------
    // 非成員
    // --------------------------------------------------------

    if (
        nonMemberResult.type === "similar"
    ) {

        nonMemberResult.players.forEach(
            item => {

                suggestions.push({

                    type:
                        "nonMember",

                    name:
                        item.name,

                    score:
                        item.score

                });

            }
        );

    }


    // --------------------------------------------------------
    // 全部一起依照相似度排序
    // 最多顯示三個
    // --------------------------------------------------------

    return suggestions

        .sort(
            (a, b) =>
                b.score - a.score
        )

        .slice(
            0,
            3
        );

}


// ============================================================
// 計算文字相似度
// ============================================================

function similarity(a, b) {

    if (a === b) {

        return 1;

    }


    // 包含關係
    if (
        a.includes(b) ||
        b.includes(a)
    ) {

        const shorter =
            Math.min(
                a.length,
                b.length
            );

        const longer =
            Math.max(
                a.length,
                b.length
            );


        return (
            0.7 +
            (shorter / longer) * 0.3
        );

    }


    const distance =
        levenshteinDistance(
            a,
            b
        );

    const maxLength =
        Math.max(
            a.length,
            b.length
        );


    if (maxLength === 0) {

        return 1;

    }


    return (
        1 -
        distance / maxLength
    );

}


// ============================================================
// Levenshtein Distance
// ============================================================

function levenshteinDistance(a, b) {

    const matrix = [];


    for (
        let i = 0;
        i <= b.length;
        i++
    ) {

        matrix[i] = [i];

    }


    for (
        let j = 0;
        j <= a.length;
        j++
    ) {

        matrix[0][j] = j;

    }


    for (
        let i = 1;
        i <= b.length;
        i++
    ) {

        for (
            let j = 1;
            j <= a.length;
            j++
        ) {

            if (
                b.charAt(i - 1) ===
                a.charAt(j - 1)
            ) {

                matrix[i][j] =
                    matrix[i - 1][j - 1];

            }
            else {

                matrix[i][j] =
                    Math.min(

                        matrix[i - 1][j - 1] + 1,

                        matrix[i][j - 1] + 1,

                        matrix[i - 1][j] + 1

                    );

            }

        }

    }


    return (
        matrix[b.length][a.length]
    );

}


// ============================================================
// 顯示相似玩家
// ============================================================

function showSuggestions(
    results,
    data,
    month
) {

    message.innerHTML = "";


    const title =
        document.createElement("div");

    title.textContent =
        "找不到完全相同的名稱，你是不是要找：";

    message.appendChild(title);


    results.forEach(result => {

        const button =
            document.createElement("button");

        button.type =
            "button";

        button.textContent =
            result.name;

        button.className =
            "suggestion-button";


        button.addEventListener(
            "click",
            () => {

                playerNameInput.value =
                    result.name;

                handlePlayerFound(
                    result.player,
                    data,
                    month
                );

            }
        );


        message.appendChild(button);

    });

}

// ============================================================
// 顯示族員 + 非成員的模糊搜尋建議
// ============================================================

function showCombinedSuggestions(
    results,
    data,
    month
) {

    message.innerHTML = "";


    const title =
        document.createElement("div");

    title.textContent =
        "找不到完全相同的名稱，你是不是要找：";

    message.appendChild(
        title
    );


    results.forEach(result => {

        const button =
            document.createElement("button");

        button.type =
            "button";

        button.textContent =
            result.name;

        button.className =
            "suggestion-button";


        button.addEventListener(
            "click",
            () => {

                playerNameInput.value =
                    result.name;


                // --------------------------------------------
                // 正式族員
                // --------------------------------------------

                if (
                    result.type === "member"
                ) {

                    handlePlayerFound(
                        result.player,
                        data,
                        month
                    );

                    return;

                }


                // --------------------------------------------
                // 非成員
                // --------------------------------------------

                if (
                    result.type === "nonMember"
                ) {

                    handleNonMemberFound(
                        result.name,
                        data,
                        month
                    );

                }

            }
        );


        message.appendChild(
            button
        );

    });

}


// ============================================================
// 成功找到玩家
// ============================================================

function handlePlayerFound(
    player,
    data,
    month
) {

    currentPlayer =
        player;

    currentData =
        data;

    currentMonth =
        month;


    console.log(
        "目前月份：",
        currentMonth
    );

    console.log(
        "目前玩家：",
        currentPlayer
    );

    console.log(
        "所有欄位：",
        currentData.headers
    );


    showTotalPage();

}

// ============================================================
// 成功找到非成員
// ============================================================

function handleNonMemberFound(
    playerName,
    data,
    month
) {

    // --------------------------------------------------------
    // 儲存目前月份資料
    // --------------------------------------------------------

    currentData =
        data;

    currentMonth =
        month;


    // --------------------------------------------------------
    // 非成員沒有成績
    //
    // 但我們仍然建立 currentPlayer
    // currentPlayer[0] = 遊戲名稱
    //
    // 這樣原本的隱藏身分功能可以繼續使用
    // --------------------------------------------------------

    currentPlayer =
        [
            playerName
        ];


    console.log(
        "目前非成員：",
        currentPlayer[0]
    );


    // --------------------------------------------------------
    // 直接跳到第七頁
    // --------------------------------------------------------

    showNonMemberIdentityPage();

}


// ============================================================
// 共用：安全轉換數字
// ============================================================

function parseNumber(value) {

    const number =
        Number(
            String(value)
                .replace(/,/g, "")
                .trim()
        );


    if (
        Number.isNaN(number)
    ) {

        return 0;

    }


    return number;

}


// ============================================================
// 共用：取得「有效成績」
//
// 空白、假、文字 → null
// 有效數字 → Number
// ============================================================

function getValidScore(value) {

    const text =
        String(value ?? "")
            .replace(/,/g, "")
            .trim();


    if (text === "") {

        return null;

    }


    const number =
        Number(text);


    if (
        !Number.isFinite(number)
    ) {

        return null;

    }


    return number;

}


// ============================================================
// 共用：切換頁面
// ============================================================

function showPage(targetPage) {

    const pages =
        document.querySelectorAll(
            ".page"
        );


    pages.forEach(page => {

        page.classList.remove(
            "active"
        );

    });


    targetPage.classList.add(
        "active"
    );


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ============================================================
// 第二頁
// 本月團本 + 深淵總達標
// ============================================================

function showTotalPage() {

    if (
        !currentPlayer ||
        !currentData
    ) {

        console.error(
            "沒有玩家資料"
        );

        return;

    }


    const playerName =
        String(
            currentPlayer[0]
        ).trim();


    // E欄 = index 4
    const achieved =
        parseNumber(
            currentPlayer[4]
        );


    const possible =
        countAllEvents(
            currentData.headers
        );


    totalPlayerName.textContent =
        playerName;

    totalAchieved.textContent =
        achieved;

    totalPossible.textContent =
        possible;


    showPage(totalPage);

}


// ============================================================
// 計算「團本 + 深淵」總場數
//
// H欄以後：
// 標準       → 排除
// 深淵       → 排除
// 日期+深淵  → 保留
// 團本       → 保留
// ============================================================

function countAllEvents(headers) {

    let count = 0;


    for (
        let i = 7;
        i < headers.length;
        i++
    ) {

        const header =
            String(
                headers[i]
            ).trim();


        if (header === "") {

            continue;

        }


        if (header === "標準") {

            continue;

        }


        if (header === "深淵") {

            continue;

        }


        count++;

    }


    return count;

}


// ============================================================
// 第二頁 → 第三頁
// ============================================================

nextToAbyssButton.addEventListener(
    "click",
    () => {

        showAbyssPage();

    }
);


// ============================================================
// 判斷是否為深淵活動
// ============================================================

function isAbyssEvent(header) {

    const name =
        String(header).trim();


    if (name === "") {

        return false;

    }


    // 單純「深淵」為輔助欄
    if (name === "深淵") {

        return false;

    }


    // 必須包含「深淵」
    if (
        !name.includes("深淵")
    ) {

        return false;

    }


    return true;

}


// ============================================================
// 取得所有深淵活動欄位
// ============================================================

function getAbyssColumns(headers) {

    const columns = [];


    for (
        let i = 7;
        i < headers.length;
        i++
    ) {

        if (
            isAbyssEvent(
                headers[i]
            )
        ) {

            columns.push(i);

        }

    }


    return columns;

}


// ============================================================
// 計算單一玩家深淵總傷害
// ============================================================

function calculateAbyssDamage(
    player,
    abyssColumns
) {

    let total = 0;


    abyssColumns.forEach(index => {

        const damage =
            parseNumber(
                player[index]
            );

        total += damage;

    });


    return total;

}


// ============================================================
// 計算深淵家族排名
//
// 同分採競賽排名：
// 1、2、2、4
// ============================================================

function calculateAbyssRank(
    targetPlayer,
    players,
    abyssColumns
) {

    const targetDamage =
        calculateAbyssDamage(
            targetPlayer,
            abyssColumns
        );


    const allDamages =
        players.map(player => {

            return calculateAbyssDamage(
                player,
                abyssColumns
            );

        });


    const higherCount =
        allDamages.filter(
            damage =>
                damage > targetDamage
        ).length;


    return higherCount + 1;

}


// ============================================================
// 第三頁
// 深淵總傷害 + 家族排名
// ============================================================

function showAbyssPage() {

    if (
        !currentPlayer ||
        !currentData
    ) {

        console.error(
            "沒有結算資料"
        );

        return;

    }


    const abyssColumns =
        getAbyssColumns(
            currentData.headers
        );


    const totalDamage =
        calculateAbyssDamage(
            currentPlayer,
            abyssColumns
        );


    const rank =
        calculateAbyssRank(
            currentPlayer,
            currentData.players,
            abyssColumns
        );


    const playerName =
        String(
            currentPlayer[0]
        ).trim();


    console.log(
        "深淵活動：",
        abyssColumns.map(
            index =>
                currentData.headers[index]
        )
    );

    console.log(
        "深淵總傷害：",
        totalDamage
    );

    console.log(
        "深淵排名：",
        rank
    );


    abyssPlayerName.textContent =
        playerName;


    abyssDamage.textContent =
        totalDamage.toLocaleString(
            "zh-TW"
        );


    if (totalDamage > 0) {

        abyssRank.textContent =
            rank;

    }
    else {

        abyssRank.textContent =
            "—";

    }


    showPage(abyssPage);

}


// ============================================================
// 第三頁 → 第四頁
// ============================================================

nextToTeamButton.addEventListener(
    "click",
    () => {

        showTeamPage();

    }
);


// ============================================================
// 判斷是否為真正的團本活動
//
// 標準        → false
// 深淵        → false
// 9/11深淵   → false
//
// 9/5樹靈     → true
// 9/6森林     → true
// 9/12金幣    → true
// ============================================================

function isTeamEvent(header) {

    const name =
        String(header).trim();


    if (name === "") {

        return false;

    }


    if (name === "標準") {

        return false;

    }


    // 所有含「深淵」的欄位都排除
    if (
        name.includes("深淵")
    ) {

        return false;

    }


    return true;

}


// ============================================================
// 計算本月團本總場數
// ============================================================

function countTeamEvents(headers) {

    let count = 0;


    for (
        let i = 7;
        i < headers.length;
        i++
    ) {

        if (
            isTeamEvent(
                headers[i]
            )
        ) {

            count++;

        }

    }


    return count;

}


// ============================================================
// 團本高標評語
// ============================================================

function getTeamComment(
    highCount,
    totalCount
) {

    if (totalCount <= 0) {

        return "本月沒有團本資料";

    }


    // 必須先判斷全高標
    if (
        highCount === totalCount
    ) {

        return "超級優秀 你是團本奇才吧！";

    }


    if (
        highCount >=
        totalCount / 2
    ) {

        return "非常優秀 請繼續保持";

    }


    return "請繼續鑽研進步 加油！";

}


// ============================================================
// 第四頁
// 團本高標次數
// ============================================================

function showTeamPage() {

    if (
        !currentPlayer ||
        !currentData
    ) {

        console.error(
            "沒有結算資料"
        );

        return;

    }


    const playerName =
        String(
            currentPlayer[0]
        ).trim();


    // B欄 = index 1
    const highCount =
        parseNumber(
            currentPlayer[1]
        );


    const totalCount =
        countTeamEvents(
            currentData.headers
        );


    const comment =
        getTeamComment(
            highCount,
            totalCount
        );


    console.log(
        "團本高標次數：",
        highCount
    );

    console.log(
        "團本總場數：",
        totalCount
    );


    teamPlayerName.textContent =
        playerName;

    teamHighCount.textContent =
        highCount;

    teamTotalCount.textContent =
        totalCount;

    teamComment.textContent =
        comment;


    showPage(teamPage);

}


// ============================================================
// 第四頁 → 第五頁
// ============================================================

nextToBestTeamButton.addEventListener(
    "click",
    () => {

        showBestTeamPage();

    }
);


// ============================================================
// 取得所有真正的團本欄位
// ============================================================

function getTeamColumns(headers) {

    const columns = [];


    for (
        let i = 7;
        i < headers.length;
        i++
    ) {

        if (
            isTeamEvent(
                headers[i]
            )
        ) {

            columns.push(i);

        }

    }


    return columns;

}


// ============================================================
// 計算某一場團本的家族排名
//
// 只讓有效數字參與排名
//
// 空白
// 假
// 文字
//
// 都不參與排名
//
// 分數越高排名越前
// ============================================================

function calculateTeamEventRank(
    targetPlayer,
    players,
    columnIndex
) {

    const targetScore =
        getValidScore(
            targetPlayer[columnIndex]
        );


    // 自己沒有有效成績
    if (targetScore === null) {

        return null;

    }


    let higherCount = 0;


    players.forEach(player => {

        const score =
            getValidScore(
                player[columnIndex]
            );


        // 沒有有效成績
        if (score === null) {

            return;

        }


        if (
            score > targetScore
        ) {

            higherCount++;

        }

    });


    return higherCount + 1;

}


// ============================================================
// 找出玩家最佳與第二佳團本
//
// 1. 計算每一場有效團本的家族排名
// 2. 依排名由好到差排序
// 3. 第一筆 = 最擅長
// 4. 第二筆 = 第二擅長
//
// 如果排名相同：
// 保留試算表中較早出現的場次
// ============================================================

function findBestTeamEvents(
    targetPlayer,
    players,
    headers
) {

    const teamColumns =
        getTeamColumns(headers);


    const results = [];


    teamColumns.forEach(
        columnIndex => {

            const score =
                getValidScore(
                    targetPlayer[
                        columnIndex
                    ]
                );


            // 沒有有效成績
            if (score === null) {

                return;

            }


            const rank =
                calculateTeamEventRank(
                    targetPlayer,
                    players,
                    columnIndex
                );


            if (rank === null) {

                return;

            }


            const eventName =
                String(
                    headers[columnIndex]
                ).trim();


            results.push({

                columnIndex:
                    columnIndex,

                eventName:
                    eventName,

                score:
                    score,

                rank:
                    rank

            });


            console.log(
                eventName,
                "成績：",
                score,
                "排名：",
                rank
            );

        }
    );


    // --------------------------------------------------------
    // 排名越小越好
    //
    // 如果排名一樣，
    // columnIndex 小的（較早場次）排前面
    // --------------------------------------------------------

    results.sort(
        (a, b) => {

            if (
                a.rank !== b.rank
            ) {

                return (
                    a.rank - b.rank
                );

            }


            return (
                a.columnIndex -
                b.columnIndex
            );

        }
    );


    return {

    best:
        results.length >= 1
            ? results[0]
            : null,

    secondBest:
        results.length >= 2
            ? results[1]
            : null,

    thirdBest:
        results.length >= 3
            ? results[2]
            : null

};

}


// ============================================================
// 移除團本名稱前面的日期
//
// 9/12金幣 → 金幣
// 10/3森林 → 森林
// 11/20樹靈 → 樹靈
// ============================================================

function removeEventDate(eventName) {

    return String(eventName)
        .replace(
            /^\d{1,2}\/\d{1,2}/,
            ""
        )
        .trim();

}


// ============================================================
// 第五頁
// 最擅長 + 第二擅長團本
// ============================================================

function showBestTeamPage() {

    if (
        !currentPlayer ||
        !currentData
    ) {

        console.error(
            "沒有結算資料"
        );

        return;

    }


    const playerName =
        String(
            currentPlayer[0]
        ).trim();


    // --------------------------------------------------------
    // 找最佳與第二佳團本
    // --------------------------------------------------------

    const results =
        findBestTeamEvents(
            currentPlayer,
            currentData.players,
            currentData.headers
        );


    const bestResult =
    results.best;

    const secondBestResult =
        results.secondBest;

    const thirdBestResult =
        results.thirdBest;


    console.log(
        "最擅長團本：",
        bestResult
    );

    console.log(
        "第二擅長團本：",
        secondBestResult
    );

    console.log(
    "第三擅長團本：",
    thirdBestResult
    );


    bestTeamPlayerName.textContent =
        playerName;


    // ========================================================
    // 第一擅長
    // ========================================================

    if (
        bestResult !== null &&
        bestResult.rank <= 25
    ) {

        // 上方只顯示種類
        // 9/12金幣 → 金幣

        bestTeamName.textContent =
            removeEventDate(
                bestResult.eventName
            );


        // 下方保留完整場次名稱

        bestTeamEventName.textContent =
            bestResult.eventName;


        bestTeamRank.textContent =
            bestResult.rank;

        bestTeamScore.textContent =
        bestResult.score.toLocaleString(
            "zh-TW"
        );


        bestTeamName.style.display =
            "block";

        bestTeamRankArea.style.display =
            "block";

        noBestTeamMessage.style.display =
            "none";

    }
    else {

        bestTeamName.style.display =
            "none";

        bestTeamRankArea.style.display =
            "none";

        noBestTeamMessage.style.display =
            "block";

    }


    // ========================================================
    // 第二擅長
    // ========================================================

    if (
        secondBestResult !== null &&
        secondBestResult.rank <= 25
    ) {

        // 9/6森林 → 森林

        secondBestTeamName.textContent =
            removeEventDate(
                secondBestResult.eventName
            );


        // 完整名稱：9/6森林

        secondBestTeamEventName.textContent =
            secondBestResult.eventName;


        secondBestTeamRank.textContent =
            secondBestResult.rank;

        secondBestTeamScore.textContent =
        secondBestResult.score.toLocaleString(
            "zh-TW"
        );


        secondBestTeamArea.style.display =
            "block";

    }
    else {

        secondBestTeamArea.style.display =
            "none";

    }

    // ========================================================
    // 第三擅長
    // ========================================================

    if (
        thirdBestResult !== null &&
        thirdBestResult.rank <= 25
    ) {

        // 上方只顯示團本種類
        // 9/19飛鏢 → 飛鏢

        thirdBestTeamName.textContent =
            removeEventDate(
                thirdBestResult.eventName
            );


        // 下方顯示完整場次
        // 9/19飛鏢

        thirdBestTeamEventName.textContent =
            thirdBestResult.eventName;


        thirdBestTeamRank.textContent =
            thirdBestResult.rank;

        thirdBestTeamScore.textContent =
        thirdBestResult.score.toLocaleString(
            "zh-TW"
        );

        thirdBestTeamArea.style.display =
            "block";

    }
    else {

        thirdBestTeamArea.style.display =
            "none";

    }


    showPage(bestTeamPage);

}


// ============================================================
// 第五頁 → 第六頁
// ============================================================

nextToAbsentButton.addEventListener(
    "click",
    () => {

        showAbsentPage();

    }
);

// ============================================================
// 缺席評語
// ============================================================

function getAbsentComment(count) {

    // 沒有缺席
    if (count < 1) {

        return "非常棒 請繼續保持";

    }


    // 有缺席
    return "要記得填寫請假或固請表單喔～";

}

// ============================================================
// 第六頁
// 缺席統計
//
// G欄 = index 6
// ============================================================

function showAbsentPage() {

    if (
        !currentPlayer ||
        !currentData
    ) {

        console.error(
            "沒有結算資料"
        );

        return;

    }


    // --------------------------------------------------------
    // 玩家名稱
    // --------------------------------------------------------

    const playerName =
        String(
            currentPlayer[0]
        ).trim();


    // --------------------------------------------------------
    // G欄：缺席次數
    //
    // A = 0
    // B = 1
    // C = 2
    // D = 3
    // E = 4
    // F = 5
    // G = 6
    // --------------------------------------------------------

    const count =
        parseNumber(
            currentPlayer[6]
        );


    // --------------------------------------------------------
    // 取得評語
    // --------------------------------------------------------

    const comment =
        getAbsentComment(
            count
        );


    console.log(
        "缺席次數：",
        count
    );

    console.log(
        "缺席評語：",
        comment
    );


    // --------------------------------------------------------
    // 填入畫面
    // --------------------------------------------------------

    absentPlayerName.textContent =
        playerName;

    absentCount.textContent =
        count;

    absentComment.textContent =
        comment;


    // --------------------------------------------------------
    // 顯示第六頁
    // --------------------------------------------------------

    showPage(absentPage);

}

// ============================================================
// 第六頁 → 最終身分頁
// ============================================================

nextToIdentityButton.addEventListener(
    "click",
    () => {

        showIdentityPage();

    }
);

// ============================================================
// 判斷玩家本月身分
//
// 優先順序：
//
// 1. 深淵巨佬
// 2. 團本高手
// 3. 合格族員
// 4. 觀察名單
// 5. 危險份子－寶箱小偷
// ============================================================

function getPlayerIdentity() {

    if (
        !currentPlayer ||
        !currentData
    ) {

        return null;

    }


    // --------------------------------------------------------
    // C欄：純深淵
    // index 2
    // --------------------------------------------------------

    const abyssStatus =
        String(
            currentPlayer[2] ?? ""
        ).trim();


    // --------------------------------------------------------
    // B欄：純團本高標次數
    // index 1
    // --------------------------------------------------------

    const teamHighCount =
        parseNumber(
            currentPlayer[1]
        );


    // --------------------------------------------------------
    // D欄：團本&深淵達標狀態
    // index 3
    // --------------------------------------------------------

    const normalStatus =
        String(
            currentPlayer[3] ?? ""
        )
            .trim()
            .toUpperCase();


    // --------------------------------------------------------
    // 自動取得本月團本總場數
    // --------------------------------------------------------

    const teamTotalCount =
        countTeamEvents(
            currentData.headers
        );


    console.log(
        "身分判定資料：",
        {
            abyssStatus,
            teamHighCount,
            teamTotalCount,
            normalStatus
        }
    );


    // ========================================================
    // 第一優先：深淵巨佬
    // ========================================================

    if (
        abyssStatus === "✓"
    ) {

        return {

            title:
                "深淵巨佬",

            message:
                "你是深淵大佬吧！每場深淵都是頂標\n請受小弟一拜"

        };

    }


    // ========================================================
    // 第二優先：團本高手
    //
    // 高標次數 >= 團本總場數一半
    //
    // teamTotalCount > 0
    // 是為了避免沒有團本時：
    //
    // 0 >= 0
    //
    // 被錯誤判定成團本高手
    // ========================================================

    if (
        teamTotalCount > 0 &&
        teamHighCount >=
            teamTotalCount / 2
    ) {

        return {

            title:
                "團本高手",

            message:
                `恭喜你這個月達成${teamHighCount}次團本高標，\n在此封你為團本高手！`

        };

    }


    // ========================================================
    // 第三優先：合格族員
    // ========================================================

    if (
        normalStatus === "✓"
    ) {

        return {

            title:
                "合格族員",

            message:
                "你是一位勤勤懇懇的族員\n感謝你為家族的貢獻\n讓我們繼續一起進步吧！"

        };

    }


    // ========================================================
    // 第四優先：觀察名單
    //
    // 同時支援：
    // Δ
    // △
    // ========================================================

    if (
        normalStatus === "Δ" ||
        normalStatus === "△"
    ) {

        return {

            title:
                "觀察名單",

            message:
                "還好嗎？是最近太忙了嗎？有需要幫助要私訊幹部喔～不然有點危險"

        };

    }


    // ========================================================
    // 第五優先：危險份子
    // ========================================================

    if (
        normalStatus === "X"
    ) {

        return {

            title:
                "危險份子－寶箱小偷",

            message:
                "叭叭！別再當寶箱小偷啦！\n你已被列入踢除名單，\n有異議或有意改善請立刻私訊幹部！"

        };

    }


    // ========================================================
    // 防呆
    //
    // 如果試算表出現目前沒定義的內容
    // ========================================================

    return {

        title:
            "本月族員",

        message:
            "本月結算完成，繼續一起努力吧！"

    };

}

// ============================================================
// 尋找玩家的隱藏身分
// ============================================================

function getSecretIdentity(playerName) {

    // 沒有月份資料
    if (!currentData) {
        return null;
    }


    // API 沒有隱藏身分資料
    if (!Array.isArray(currentData.secretIdentities)) {
        return null;
    }


    const targetName =
        String(playerName ?? "").trim();


    // 尋找遊戲名稱完全相同的玩家
    const secret =
        currentData.secretIdentities.find(row => {

            const secretPlayerName =
                String(row[0] ?? "").trim();

            return secretPlayerName === targetName;

        });


    // 找不到
    if (!secret) {
        return null;
    }


    // 找到後整理成比較好使用的格式
    return {

        title:
            String(secret[1] ?? "").trim(),

        message:
            String(secret[2] ?? "").trim()

    };

}

// ============================================================
// 最後一頁
// 本月身分
// ============================================================

function showIdentityPage() {

    identityPage.classList.remove(
        "nailong-theme"
    );

    // ========================================================
    // 兎專屬背景主題
    // ========================================================

    const identityPlayerNameValue =
        String(currentPlayer?.[0] ?? "").trim();

    if (
        normalizeName(identityPlayerNameValue) ===
        normalizeName("兎")
    ) {

        identityPage.classList.add(
            "rabbit-theme"
        );

    }
    else {

        identityPage.classList.remove(
            "rabbit-theme"
        );

    }

    if (
        !currentPlayer ||
        !currentData
    ) {

        console.error(
            "沒有結算資料"
        );

        return;

    }


    const playerName =
        String(
            currentPlayer[0]
        ).trim();


    const identity =
        getPlayerIdentity();


    if (!identity) {

        console.error(
            "無法判斷玩家身分"
        );

        return;

    }


    console.log(
        "玩家最終身分：",
        identity
    );


    identityPlayerName.textContent =
        playerName;

    identityTitle.textContent =
        identity.title;

    identityMessage.textContent =
        identity.message;


    // ============================================================
    // 檢查隱藏身分
    // ============================================================

    const secretIdentity =
        getSecretIdentity(
            currentPlayer[0]
        );


    if (secretIdentity) {

        // 有隱藏身分
        secretIdentityTitle.textContent =
            secretIdentity.title;

        secretIdentityMessage.textContent =
            secretIdentity.message;

        secretIdentityBox.style.display =
            "block";

    }
    else {

        // 沒有隱藏身分
        secretIdentityTitle.textContent =
            "";

        secretIdentityMessage.textContent =
            "";

        secretIdentityBox.style.display =
            "none";

    }

    showPage(
        identityPage
    );


    playIdentityEffect(
        identity.title
    );

}

// ============================================================
// 第七頁：非成員身分
// ============================================================

function showNonMemberIdentityPage() {

    identityPage.classList.remove(
        "rabbit-theme"
    );

    if (
        !currentPlayer ||
        !currentData
    ) {

        console.error(
            "沒有非成員資料"
        );

        return;

    }


    const playerName =
        String(
            currentPlayer[0] ?? ""
        ).trim();

    // ========================================================
    // 狗歐專屬奶龍主題
    // ========================================================

    if (
        normalizeName(playerName) ===
        normalizeName("狗歐")
    ) {

        identityPage.classList.add(
            "nailong-theme"
        );

    }
    else {

        identityPage.classList.remove(
            "nailong-theme"
        );

    }


    // ========================================================
    // 非族員身分
    // ========================================================

    identityPlayerName.textContent =
        playerName;

    identityTitle.textContent =
        "非族員";

    identityMessage.textContent =
        "還不快滾回來幫忙(x";


    // ========================================================
    // 尋找隱藏身分
    // ========================================================

    const secretIdentity =
        getSecretIdentity(
            playerName
        );


    if (secretIdentity) {

        secretIdentityTitle.textContent =
            secretIdentity.title;

        secretIdentityMessage.textContent =
            secretIdentity.message;

        secretIdentityBox.style.display =
            "block";

    }
    else {

        secretIdentityTitle.textContent =
            "";

        secretIdentityMessage.textContent =
            "";

        secretIdentityBox.style.display =
            "none";

    }


    // ========================================================
    // 清除上一個身分的特效
    // ========================================================

    clearIdentityEffects();


    // ========================================================
    // 直接顯示第七頁
    // ========================================================

    showPage(
        identityPage
    );

}

// ============================================================
// 第八頁排行榜
// 共用：取得前三個「不同分數」
//
// 排名方式：密集排名
//
// 例如：
// 10、10、9、9、8
//
// 會變成：
// 第1名：10
// 第2名：9
// 第3名：8
// ============================================================

function getDenseTop3(results) {

    // --------------------------------------------------------
    // 排除沒有名字、沒有有效成績的玩家
    // --------------------------------------------------------

    const validResults =
        results.filter(item => {

            return (
                item.name !== "" &&
                Number.isFinite(item.score) &&
                item.score > 0
            );

        });


    // --------------------------------------------------------
    // 找出所有不同的成績
    // 並由高到低排序
    // --------------------------------------------------------

    const uniqueScores =
        [
            ...new Set(
                validResults.map(
                    item => item.score
                )
            )
        ]
        .sort(
            (a, b) =>
                b - a
        )
        .slice(
            0,
            3
        );


    // --------------------------------------------------------
    // 建立前三名
    //
    // 每一個名次可以有多位玩家
    // --------------------------------------------------------

    return uniqueScores.map(
        (score, index) => {

            const players =
                validResults

                    .filter(
                        item =>
                            item.score === score
                    )

                    .map(
                        item =>
                            item.name
                    );


            return {

                rank:
                    index + 1,

                score:
                    score,

                players:
                    players

            };

        }
    );

}

// ============================================================
// 深淵總傷害 TOP 3
// ============================================================

function getAbyssTop3() {

    if (!currentData) {

        return [];

    }


    const abyssColumns =
        getAbyssColumns(
            currentData.headers
        );


    const results =
        currentData.players.map(
            player => {

                const name =
                    String(
                        player[0]
                    ).trim();


                const score =
                    calculateAbyssDamage(
                        player,
                        abyssColumns
                    );


                return {

                    name:
                        name,

                    score:
                        score

                };

            }
        );


    return getDenseTop3(
        results
    );

}

// ============================================================
// 團本高標 TOP 3
//
// B欄 = index 1
// ============================================================

function getTeamHighTop3() {

    if (!currentData) {

        return [];

    }


    const results =
        currentData.players.map(
            player => {

                return {

                    name:
                        String(
                            player[0]
                        ).trim(),

                    score:
                        parseNumber(
                            player[1]
                        )

                };

            }
        );


    return getDenseTop3(
        results
    );

}

// ============================================================
// 團本達標 TOP 3
//
// E欄 = index 4
// ============================================================

function getTeamPassTop3() {

    if (!currentData) {

        return [];

    }


    const results =
        currentData.players.map(
            player => {

                return {

                    name:
                        String(
                            player[0]
                        ).trim(),

                    score:
                        parseNumber(
                            player[4]
                        )

                };

            }
        );


    return getDenseTop3(
        results
    );

}

// ============================================================
// 第八頁排行榜
// 將排行榜資料畫成頒獎台
//
// 顯示順序：
// 第2名 → 第1名 → 第3名
//
// 同分玩家會顯示在同一個名次
// ============================================================

function renderPodium(
    container,
    rankings,
    type
) {

    // 先清空舊內容
    container.innerHTML = "";


    // --------------------------------------------------------
    // 完全沒有排行榜資料
    // --------------------------------------------------------

    if (rankings.length === 0) {

        const emptyMessage =
            document.createElement("p");

        emptyMessage.className =
            "ranking-empty";

        emptyMessage.textContent =
            "本月暫無有效成績";

        container.appendChild(
            emptyMessage
        );

        return;

    }


    // --------------------------------------------------------
    // 頒獎台顯示順序
    //
    // 視覺上：
    // 第2名　第1名　第3名
    // --------------------------------------------------------

    const displayOrder =
        [2, 1, 3];


    displayOrder.forEach(rankNumber => {

        const ranking =
            rankings.find(
                item =>
                    item.rank === rankNumber
            );


        // 如果沒有這個名次就不建立
        if (!ranking) {

            return;

        }


        // ----------------------------------------------------
        // 整個名次區塊
        // ----------------------------------------------------

        const item =
            document.createElement("div");

        item.className =
            `podium-item podium-rank-${rankNumber}`;


        // ----------------------------------------------------
        // 玩家名稱區
        // ----------------------------------------------------

        const names =
            document.createElement("div");

        names.className =
            "podium-names";


        ranking.players.forEach(
            playerName => {

                const name =
                    document.createElement("div");

                name.className =
                    "podium-player-name";

                name.textContent =
                    playerName;

                names.appendChild(
                    name
                );

            }
        );


        // ----------------------------------------------------
        // 成績
        // ----------------------------------------------------

        const score =
            document.createElement("div");

        score.className =
            "podium-score";


        if (type === "abyss") {

            score.textContent =
                ranking.score.toLocaleString(
                    "zh-TW"
                ) +
                " 傷害";

        }
        else {

            score.textContent =
                ranking.score +
                " 次";

        }


        // ----------------------------------------------------
        // 頒獎台柱子
        // ----------------------------------------------------

        const block =
            document.createElement("div");

        block.className =
            "podium-block";


        // ----------------------------------------------------
        // 獎牌
        // ----------------------------------------------------

        const medal =
            document.createElement("div");

        medal.className =
            "podium-medal";


        if (rankNumber === 1) {

            medal.textContent =
                "🥇";

        }
        else if (rankNumber === 2) {

            medal.textContent =
                "🥈";

        }
        else {

            medal.textContent =
                "🥉";

        }


        // ----------------------------------------------------
        // 名次文字
        // ----------------------------------------------------

        const rankText =
            document.createElement("div");

        rankText.className =
            "podium-rank-text";

        rankText.textContent =
            `第 ${rankNumber} 名`;


        block.appendChild(
            medal
        );

        block.appendChild(
            rankText
        );


        item.appendChild(
            names
        );

        item.appendChild(
            score
        );

        item.appendChild(
            block
        );


        container.appendChild(
            item
        );

    });

}

// ============================================================
// 第八頁：顯示本月排行榜
// ============================================================

function showRankingPage() {

    if (!currentData) {

        console.error(
            "沒有排行榜資料"
        );

        return;

    }


    // 離開身分頁時移除身分特效
    clearIdentityEffects();


    // --------------------------------------------------------
    // 計算三個排行榜
    // --------------------------------------------------------

    const abyssRankings =
        getAbyssTop3();

    const teamHighRankings =
        getTeamHighTop3();

    const teamPassRankings =
        getTeamPassTop3();


    // --------------------------------------------------------
    // 深淵排行榜
    // --------------------------------------------------------

    renderPodium(
        abyssPodium,
        abyssRankings,
        "abyss"
    );


    // --------------------------------------------------------
    // 團本高標排行榜
    // --------------------------------------------------------

    renderPodium(
        teamHighPodium,
        teamHighRankings,
        "count"
    );


    // --------------------------------------------------------
    // 團本達標排行榜
    // --------------------------------------------------------

    renderPodium(
        teamPassPodium,
        teamPassRankings,
        "count"
    );


    // --------------------------------------------------------
    // 顯示第八頁
    // --------------------------------------------------------

    showPage(
        rankingPage
    );

}

// ============================================================
// 第七頁 → 第八頁
// ============================================================

nextToRankingButton.addEventListener(
    "click",
    () => {

        showRankingPage();

    }
);

// ============================================================
// 重新查詢
// ============================================================

restartButton.addEventListener(
    "click",
    () => {

        console.log("重新查詢按鈕已點擊");

        // 清除身分特效
        clearIdentityEffects();

        // 清除目前資料
        currentPlayer = null;
        currentData = null;
        currentMonth = null;

        // 清空玩家名稱
        playerNameInput.value = "";

        // 清空訊息
        showMessage("");

        // 回到查詢頁
        showPage(searchPage);

        // 游標回到輸入框
        playerNameInput.focus();

    }
);


// ============================================================
// 清除所有身分特效
// ============================================================

function clearIdentityEffects() {

    document.body.classList.remove(
        "abyss-king-mode",
        "team-master-mode",
        "qualified-mode",
        "watch-mode",
        "danger-mode"
    );


    const effectLayer =
        document.getElementById(
            "effectLayer"
        );


    if (effectLayer) {

        effectLayer.innerHTML = "";

    }

}

// ============================================================
// 一般慶祝粒子
//
// 用於：
// 團本高手
// 合格族員
// ============================================================

function createCelebrationParticles(
    amount = 30
) {

    const effectLayer =
        document.getElementById(
            "effectLayer"
        );


    if (!effectLayer) {

        return;

    }


    const symbols = [
        "✨",
        "★",
        "●",
        "◆",
        "✦"
    ];


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "effect-particle";


        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        particle.style.left =
            Math.random() * 100 +
            "%";


        particle.style.fontSize =
            (
                12 +
                Math.random() * 16
            ) +
            "px";


        particle.style.animationDuration =
            (
                1.8 +
                Math.random() * 1.5
            ) +
            "s";


        particle.style.animationDelay =
            (
                Math.random() * 0.5
            ) +
            "s";


        effectLayer.appendChild(
            particle
        );


        // 幾秒後自動移除
        setTimeout(
            () => {

                particle.remove();

            },
            4000
        );

    }

}

// ============================================================
// 深淵巨佬
// 金色 Boss 爆發
// ============================================================

function createAbyssBossEffect() {

    const effectLayer =
        document.getElementById(
            "effectLayer"
        );


    if (!effectLayer) {

        return;

    }


    const symbols = [
        "✦",
        "★",
        "✨",
        "◆",
        "✧"
    ];


    const particleCount =
        36;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "abyss-particle";


        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        // ----------------------------------------------------
        // 一半從左邊
        // 一半從右邊
        // ----------------------------------------------------

        const fromLeft =
            i <
            particleCount / 2;


        particle.style.left =
            fromLeft
                ? "5%"
                : "95%";


        particle.style.top =
            (
                25 +
                Math.random() * 50
            ) +
            "%";


        // ----------------------------------------------------
        // 移動方向
        // ----------------------------------------------------

        const moveX =
            fromLeft
                ? 100 + Math.random() * 250
                : -(100 + Math.random() * 250);


        const moveY =
            -150 +
            Math.random() * 300;


        particle.style.setProperty(
            "--move-x",
            moveX + "px"
        );


        particle.style.setProperty(
            "--move-y",
            moveY + "px"
        );


        particle.style.fontSize =
            (
                16 +
                Math.random() * 22
            ) +
            "px";


        particle.style.animationDelay =
            (
                Math.random() * 0.25
            ) +
            "s";


        effectLayer.appendChild(
            particle
        );


        setTimeout(
            () => {

                particle.remove();

            },
            2000
        );

    }

}

// ============================================================
// 根據身分播放特效
// ============================================================

function playIdentityEffect(
    identityTitle
) {

    // 先清除之前的特效
    clearIdentityEffects();


    // ========================================================
    // 深淵巨佬
    // ========================================================

    if (
        identityTitle ===
        "深淵巨佬"
    ) {

        document.body.classList.add(
            "abyss-king-mode"
        );


        // Boss 金色爆發
        createAbyssBossEffect();


        return;

    }


    // ========================================================
    // 團本高手
    // ========================================================

    if (
        identityTitle ===
        "團本高手"
    ) {

        document.body.classList.add(
            "team-master-mode"
        );


        createCelebrationParticles(
            25
        );


        return;

    }


    // ========================================================
    // 合格族員
    // ========================================================

    if (
        identityTitle ===
        "合格族員"
    ) {

        document.body.classList.add(
            "qualified-mode"
        );


        createCelebrationParticles(
            18
        );


        return;

    }


    // ========================================================
    // 觀察名單
    // ========================================================

    if (
        identityTitle ===
        "觀察名單"
    ) {

        document.body.classList.add(
            "watch-mode"
        );


        return;

    }


    // ========================================================
    // 寶箱小偷
    // ========================================================

    if (
        identityTitle ===
        "危險份子－寶箱小偷"
    ) {

        document.body.classList.add(
            "danger-mode"
        );


        return;

    }

}

