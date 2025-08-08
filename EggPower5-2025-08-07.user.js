// ==UserScript==
// @name         EggPower5
// @namespace    http://tampermonkey.net/
// @version      2025-08-07
// @description  Efficientamento Egg Finance Affida
// @author       Massimo Caratelli
// @match        https://finance.blackbird71.com/a/index2.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=blackbird71.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const style = document.createElement('style');
    style.textContent = `
        .trigger-menu-top {
            background-color: #5d32ff !important;
            height: 50px;
            color: #fff;
            line-height: 50px;
            font-size: 20px;
            padding-left: 20px;
            min-width: 1000px;
            transition: .3s;
        }
        .mp-level {
          background-color: #3f20b5 !important;
        }
        .mp-menu h2 {
          color: #fafafa;
        }
        .trigger-menu-top:hover {
            background-color: #4e2ec6 !important;
        }

        .new_profile_img {
            border-radius: 50%;
            width: 40;
            height: 40;
            margin-top: 1px;
        }

        .topmenu_search_button {
            background-image: url("https://unpkg.com/heroicons@2.2.0/24/outline/magnifying-glass-circle.svg") !important;
            background-color: transparent !important;
            color: #fafafa !important;
            filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(180deg);
        }
        .notifyIcon {
            filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(180deg);
            width: 2em;
            transform: translate(10px, 5px);
        }
        .topmenu_search {
            background-color: #f5f5f5 !important;
            color: #333333 !important;
        }
        .bott1 {
            background: #5d32ff !important;
            text-transform: capitalize !important;
        }
    `;
    document.head.appendChild(style);

    const h2 = document.querySelector('#mp-menu .mp-level a > h2');
    h2.setAttribute('style', 'background-color: #3f20b5 !important');
    const logoImg = document.querySelector('img[src*="logo.svg"]');
    logoImg.src = "https://www.affida.credit/assets/logo_new_white-DYsd74pt.png";

    const profileLink = document.querySelector('a[href*="modulo=profilo"]');
    if (!profileLink) return;

    const divs = profileLink.querySelectorAll('div');
    if (divs.length < 2) return;

    const username = divs[1].textContent.trim();
    if (!username) return;

    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=f9f3ff&size=40&color=333333`;

    // Crea nuovo tag <img>
    const newImg = document.createElement('img');
    newImg.src = avatarUrl;
    newImg.className = "new_profile_img";

    // Svuota il contenuto dell'elemento <a>
    profileLink.innerHTML = '';
    profileLink.appendChild(newImg);

    // sovrascrivo color nella searchbar
    const inputSearch = document.querySelector('.topmenu_search');
    inputSearch.style.setProperty('color', '#333333', 'important');
    inputSearch.style.setProperty('background-image', 'none', 'important');

    // modifico notifiche
    const notifyLink = document.querySelector('a[href*="filtro=notifiche"]');
    if (!notifyLink) return;
    notifyLink.parentElement.setAttribute("style", "margin-right: 0 !important");
    const notificheDivs = notifyLink.querySelectorAll('div');
    notificheDivs[0].setAttribute('style', "");
    notificheDivs[1].setAttribute('style', "font-size: 12px; font-weight: 600; position: relative; float: right; bottom: 10px;left: 0;color: #ff4bdd !important");
    const newIconNotifyImg = document.createElement('img');
    const notifyUrl = `https://unpkg.com/heroicons@2.2.0/24/outline/bell.svg`;
    newIconNotifyImg.src = notifyUrl;
    notificheDivs[0].prepend(newIconNotifyImg);
    newIconNotifyImg.classList.add('notifyIcon');
    // modifico comunicazioni
    const comunicazioniLink = document.querySelector('a[href*="modulo=comunicazioni"]');
    if (!comunicazioniLink) return;
    const comDivs = comunicazioniLink.querySelectorAll('div');
    comDivs[0].setAttribute('style', "");
    const newIconComunicazioniImg = document.createElement('img');
    const comUrl = `https://unpkg.com/heroicons@2.2.0/24/outline/inbox-stack.svg`;
    newIconComunicazioniImg.src = comUrl;
    comDivs[0].prepend(newIconComunicazioniImg);
    newIconComunicazioniImg.classList.add('notifyIcon');
    // modifico calendario
    const calendarLink = document.querySelector('a[href*="modulo=calendario"]');
    if (!calendarLink) return;
    calendarLink.parentElement.setAttribute("style", "margin-right: 2em !important");
    const calendarDivs = calendarLink.querySelectorAll('div');
    calendarDivs[0].setAttribute('style', "");
    const newIconCalendarImg = document.createElement('img');
    const calendarUrl = `https://unpkg.com/heroicons@2.2.0/24/outline/calendar.svg`;
    newIconCalendarImg.src = calendarUrl;
    calendarDivs[0].prepend(newIconCalendarImg);
    newIconCalendarImg.classList.add('notifyIcon');

    window.addEventListener('load', () => {
        //Dettaglio lead
        const leadContainer = document.getElementById("aprilead");

        if (!leadContainer) {
            console.warn("❌ Impossibile trovare #aprilead");
            return;
        }

        // modifico stile bottoni
        const buttons = document.querySelectorAll('.bott1');
        console.log(buttons);
        Array.from(buttons).forEach(el => {
              el.setAttribute('style', 'background-clor: #5d32ff !important');
        });

        // nascondo sezioni indesiderate
        const secDel_1 = document.getElementsByClassName("sezione-etBammkm");
        Array.from(secDel_1).forEach(el => {
              el.setAttribute('style', 'display: none !important');
        });
        const secDel_2 = document.getElementsByClassName("sezione-TDfslzes");
        Array.from(secDel_2).forEach(el => {
              el.setAttribute('style', 'display: none !important');
        });
        const secDel_3 = document.getElementsByClassName("sezione-cMafumJA");
        Array.from(secDel_3).forEach(el => {
              el.setAttribute('style', 'display: none !important');
        });

        // rimuovo azioni non necessarie
        const sollecito = document.getElementById("campagnaLeadwidget_campagnaLead_sollecito_428478");
        console.log(sollecito);
        sollecito.style.display = "none";
        const richiestaInfo = document.getElementById("campagnaLeadwidget_campagnaLead_richiestaInfo_428478");
        richiestaInfo.style.display = "none";

        // modifica titolo nome lead title_div_underline testo16px
        const nomeLead = document.getElementsByClassName("title_div_underline testo16px");
        const titleNomeTagP = document.createElement('p');
        titleNomeTagP.innerText = "Nominativo";
        titleNomeTagP.style.fontSize = "14px";
        titleNomeTagP.style.textAlign = "center";
        titleNomeTagP.style.color = "#333333";
        titleNomeTagP.style.margin = "0";
        titleNomeTagP.style.fontWeight = "400";

        const dataCreazioneLead = document.getElementsByClassName("div_altern_form1");
        const creatoIl = document.createElement('p');
        creatoIl.innerText = "Data lead: " + dataCreazioneLead[1].innerText;
        creatoIl.style.fontSize = "14px";
        creatoIl.style.textAlign = "center";
        creatoIl.style.color = "#333333";
        creatoIl.style.margin = "0";
        creatoIl.style.fontWeight = "400";

        console.log(nomeLead);
        nomeLead[0].setAttribute('style', 'text-transform: capitalize !important; color: #4e2ec6 !important; font-size:28px; height: 85px; text-align: center');
        nomeLead[0].appendChild(creatoIl);
        nomeLead[0].prepend(titleNomeTagP);

        const style = document.createElement('style');

        document.head.appendChild(style);
        const table = leadContainer.querySelector("div > table");
        if (!table) {
            console.warn("❌ Nessuna tabella trovata dentro #aprilead");
            return;
        }

        const rows = table.querySelectorAll("tr");
        if (rows.length === 0) {
            console.warn("❌ Nessuna riga trovata nella tabella");
            return;
        }

        const lastRow = rows[rows.length - 1];
        const cells = lastRow.querySelectorAll("td");

        if (cells.length === 0) {
            console.warn("❌ Nessuna cella trovata nell'ultima riga");
            return;
        }

        const lastCell = cells[cells.length - 1];
        const innerDiv = lastCell.querySelector('div');
        const omonimiBtn = innerDiv.querySelector('input');
        omonimiBtn.className = "bott1";

        // Crea il bottone
        const btn = document.createElement('button');
        btn.innerText = 'Quota Cedibile';
        btn.className = "bott1";

        btn.onclick = () => {
            console.log("✅ Bottone cliccato – qui va la logica di invio al WS");
            alert("Funzionalità ancora in sviluppo!");
        };

        // Inserisce il bottone nel td
        innerDiv.appendChild(btn);
    });
})();