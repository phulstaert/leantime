

function openModal() {

    var modalOptions = {
        sizes: {
            minW: 500,
            minH: 500
        },
        resizable: true,
        autoSizable: true,
        callbacks: {
            beforePostSubmit: function () {
                jQuery(".showDialogOnLoad").show();

                if(tinymce.editors.length>0) {
                    jQuery('textarea.complexEditor, textarea.tinymceSimple').tinymce().save();
                    jQuery('textarea.complexEditor, textarea.tinymceSimple').tinymce().remove();
                }
            },
            beforeShowCont: function () {
                jQuery(".showDialogOnLoad").show();
            },
            afterShowCont: function () {

                jQuery(".formModal, .modal").nyroModal(modalOptions);
                tippy('[data-tippy-content]');
            },
            beforeClose: function () {
                history.pushState("", document.title, window.location.pathname + window.location.search);
                location.reload();
            }
        },
        titleFromIframe: true
    };

    var url = window.location.hash.substring(1);
    if(url.includes("showTicket") ||
        url.includes("ideaDialog")) {
        modalOptions.sizes.minW = 1500;
    }

    var urlParts = url.split("/");
    if(urlParts.length>2 && urlParts[1] !== "tab") {
        jQuery.nmManual(leantime.appUrl+"/"+url, modalOptions);
    }
}

jQuery(document).ready(function() {
    openModal();
});

window.addEventListener("hashchange", function () {
    openModal();
});
