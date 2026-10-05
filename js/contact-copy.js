/*
 * Bouton « Copier l'adresse » de la section contact.
 * L'adresse n'est jamais écrite dans ce fichier : elle est lue dans le DOM au
 * moment du clic (textContent de #contact-address, conteneur stable que le décodeur Cloudflare ne remplace pas). Ainsi, si Cloudflare
 * « Email Address Obfuscation » réécrit l'adresse dans le HTML puis la décode
 * côté client, c'est l'adresse décodée qui est copiée.
 */
(function () {
    "use strict";

    var RESET_DELAY_MS = 2500;
    var button = document.getElementById("contact-copy");
    var address = document.getElementById("contact-address");
    var status = document.getElementById("contact-copy-status");
    if (!button || !address || !status) return;

    var timer = null;

    /**
     * Sélectionne le contenu textuel d'un élément (aide à la copie manuelle).
     * @param {Element} el élément dont le texte est sélectionné
     */
    function selectText(el) {
        var selection = window.getSelection();
        if (!selection) return;
        var range = document.createRange();
        range.selectNodeContents(el);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    /**
     * Repli : copie via un champ temporaire et document.execCommand('copy').
     * Le champ est hors écran mais en font-size 16px pour éviter le zoom iOS.
     * @param {string} text texte à copier
     * @returns {boolean} true si la commande de copie a réussi
     */
    function legacyCopy(text) {
        var field = document.createElement("textarea");
        field.value = text;
        field.setAttribute("readonly", "");
        field.setAttribute("aria-hidden", "true");
        field.style.cssText = "position:fixed;top:0;left:0;opacity:0;font-size:16px;";
        document.body.appendChild(field);
        var ok = false;
        try {
            field.focus({ preventScroll: true });
            field.select();
            field.setSelectionRange(0, text.length); // iOS WebKit
            ok = document.execCommand("copy");
        } catch (e) {
            ok = false;
        } finally {
            document.body.removeChild(field);
        }
        return ok;
    }

    /**
     * Copie le texte : Clipboard API si disponible, sinon execCommand.
     * @param {string} text texte à copier
     * @returns {Promise<boolean>} true si la copie a réussi
     */
    function copyText(text) {
        if (window.isSecureContext && navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text).then(
                function () { return true; },
                function () { return legacyCopy(text); }
            );
        }
        return Promise.resolve(legacyCopy(text));
    }

    /**
     * Affiche un message (annoncé via aria-live) puis le retire après un délai.
     * @param {string} message texte du retour utilisateur
     * @param {boolean} failed true pour le style d'échec
     */
    function showStatus(message, failed) {
        clearTimeout(timer);
        status.textContent = message;
        status.classList.toggle("is-error", failed);
        timer = setTimeout(function () {
            status.textContent = "";
            status.classList.remove("is-error");
        }, RESET_DELAY_MS);
    }

    /**
     * Gestionnaire de clic : lit l'adresse affichée, la copie, informe l'utilisateur.
     */
    function onClick() {
        var text = (address.textContent || "").replace(/ /g, " ").trim();
        if (text.indexOf("@") === -1) {
            // Adresse non décodée (ex. « [email protected] ») : ne rien copier.
            selectText(address);
            showStatus("Copie impossible, sélectionnez l’adresse", true);
            return;
        }
        copyText(text).then(function (ok) {
            if (ok) {
                showStatus("Adresse copiée", false);
            } else {
                selectText(address);
                showStatus("Copie impossible, sélectionnez l’adresse", true);
            }
        });
    }

    button.addEventListener("click", onClick);
})();
