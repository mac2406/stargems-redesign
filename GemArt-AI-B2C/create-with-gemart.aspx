<%@ Page Title="" Language="C#" MasterPageFile="MasterPage.master" AutoEventWireup="true" CodeFile="create-with-gemart.aspx.cs" Inherits="createwithgemart" EnableEventValidation="false" %>

<%@ Register Src="./usercontrols/gemartleftmenu.ascx" TagPrefix="uc1" TagName="gemartleftmenu" %>
<%@ Register Src="./usercontrols/gemartmenuscript.ascx" TagPrefix="uc2" TagName="gemartmenuscript" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeaderSection" runat="Server">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <link href="assets/css/gemart-ai-1.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightslider/1.1.6/css/lightslider.css" referrerpolicy="no-referrer" />
    <style>
        /* Nantar hai remove karayache*/
        /* .st-sticky-share-buttons {
            display: none !important;
        }*/
        :root {
            --header-height: 110px !important;
        }

        .logoheader {
            padding: 10px 0 !important;
            height: 70px !important;
        }

        .logosec img {
            max-width: 50% !important;
        }

        .bottomleft {
            display: none !important;
        }

        #Submitbtn .fa-spinner {
            color: #4d6e8e;
            opacity: .8;
        }

        .btnLoadMore {
            background-color: #1e3a5f;
            border: none;
            border-radius: 8px;
            padding: 8px 12px;
            font-size: 0.85rem;
            white-space: nowrap;
        }

        .missingdetails, .loader {
            max-width: 400px;
            padding: 15px;
            border: 1px solid #e2e8f0;
            background: #fff;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
            border-bottom-left-radius: 0px;
            border-bottom-left-radius: 4px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
    </style>
    <style>
        div#priceview h3 {
            font-size: 22px;
            text-align: center;
        }

        div#priceview p {
            text-align: center;
            font-size: 14px;
            margin: 10px 0 0;
        }

            div#priceview p strong {
                display: block;
                font-size: 16px;
                color: #000;
            }

            div#priceview p.all-natural-stones strong {
                color: #147f19;
            }

            div#priceview p.all-lab-stones strong {
                color: #cd0e0e;
            }

        div#priceview span.note {
            font-size: 12px;
            color: #1e3a5f;
            font-weight: 500;
            line-height: 17px;
            display: block;
            text-align: center;
        }

        .right-details-panel {
            height: auto !important;
            margin-bottom: 80px;
        }

        div#priceview p.text-alert {
            color: red;
            font-size: 12px;
            margin: 0;
        }
    </style>
    <style>
        div#basicModal2 .modal-dialog {
            max-width: 900px;
        }

        div#basicModal2 .table {
            table-layout: fixed;
        }

        div#basicModal2 .bi-info-circle span {
            display: none;
            position: absolute;
            font-size: 10px;
            background: #144a76;
            padding: 2px 8px;
            color: #fff;
            border-radius: 5px;
            width: max-content;
            right: 0;
            opacity: 1;
            top: -1px;
            animation: slideIn 1s ease-in-out infinite;
        }

        div#basicModal2 .bi-info-circle:hover span {
            display: block !important;
        }

        .modal-header {
            border-bottom: 1px solid #dee2e6;
        }

        .gendate {
            font-size: 12px;
            text-align: center;
            margin-top: 20px;
        }

        #preview-img {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: auto;
            margin: 0 auto;
        }

        #remove-preview, #remove-preview1 {
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
            background: rgb(255 0 0);
            color: rgb(255, 255, 255);
            border-radius: 7px;
            width: 30px;
            height: 30px;
            font-size: 16px;
            display: none;
            align-items: center;
            justify-content: center;
        }

        div#prompt-preview-container {
            position: relative;
            margin: 0 20px;
            position: relative;
            background: #ffffff;
            border-radius: 20px 20px 0 0;
            padding: 5px 15px;
        }
    </style>
    <style>
        .credits {
            background: #6487af;
            padding: 4px 15px;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 500;
            color: #fff;
        }

        .resultdetails.active {
            border: 1px solid #6487af;
            box-shadow: 1px 1px 7px 0px #6487af;
            overflow: hidden;
        }

            .resultdetails.active a#viewbreakdown {
                background-color: var(--primary) !important;
                color: white !important;
                box-shadow: 0 4px 12px rgba(88, 124, 160, 0.4);
                transform: translateY(-1px);
                pointer-events: none;
            }

            .resultdetails.active a#selectstyle {
                opacity: .7;
                pointer-events: none;
            }
    </style>
    <style>
        .gemloader {
            margin: 5px auto !important;
        }

        .style-comparison-container .resultdetails.active {
            border: 1px solid #6487af;
            box-shadow: 1px 1px 7px 0px #6487af;
            overflow: hidden;
        }
    </style>

    <%-- ERROR MODEL --%>
    <style>
        div#ErrorModal i.fa-clock {
            font-size: 30px;
            padding: 17px 20px;
            background: #eaeded;
            color: #137fec;
            border-radius: 50%;
            margin-bottom: 20px;
        }

        div#ErrorModal a.btn {
            padding: 13px;
            font-size: 18px;
            border: none;
            box-shadow: 0px 0px 5px 1px #08080826;
        }

        div#ErrorModal a.btn-primary {
            background: #137fec;
        }

        div#ErrorModal a.btn-secondary {
            background: #eaeded;
            color: #000;
        }

        div#ErrorModal a.supportbtn {
            color: #137fec;
            font-weight: 500;
        }
    </style>

    <style>
        .lSSlideOuter .lSPager.lSGallery {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            width: 100% !important;
        }

        .lSAction > a {
            filter: brightness(0%) !important;
        }

        .lSSlideOuter .lSPager.lSGallery img.img-fluid.w-100 {
            border-radius: 10px !important;
        }

        .glightbox-clean .gdesc-inner {
            background: #fff;
        }

        .aistusec i.downloadbtn, .variantsec i.downloadbtn {
            opacity: 0;
            transition: ease-in .4s;
            z-index: 999;
        }

        .aistusec a.gallery-lightbox:hover i.downloadbtn,
        .variantsec a.gallery-lightbox:hover i.downloadbtn {
            opacity: 1;
        }

        .aistusec a.gallery-lightbox:hover img,
        .variantsec a.gallery-lightbox:hover img {
            opacity: .3;
        }

        p#copyText, p#copyText a {
            font-size: 14px;
        }

            p#copyText a {
                color: #1e3a5f;
                font-weight: 500;
            }

        div#detailview td span {
            display: block;
            font-size: 14px;
            font-weight: 400;
        }

        a.generateVariant {
            width: 75px;
            height: 75px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #6487af;
            color: #fff;
            border-radius: 12px;
        }

            a.generateVariant:hover {
                background: #fff;
            }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="CenterSection" runat="Server">
    <asp:HiddenField ID="GenImage1" runat="server" Value="" />
    <asp:HiddenField ID="GenImage2" runat="server" Value="" />
    <asp:HiddenField ID="credits" runat="server" Value="" />
    <asp:HiddenField ID="CustIDs" runat="server" Value="" />
    <asp:HiddenField ID="ThreadID" runat="server" Value="" />
    <asp:HiddenField ID="PriceAddon" runat="server" Value="False" />
    <asp:HiddenField ID="CadUpload" runat="server" Value="" />
    <asp:HiddenField ID="CadIDs" runat="server" Value="" />

    <div class="container-fluid">
        <div class="row" id="gemblockmain" runat="server">
            <uc1:gemartleftmenu runat="server" ID="gemartleftmenu" />
            <main class="col-md-9 ms-sm-auto col-lg-10 p-0 main-content-wrapper vh-100 overflow-y-auto">
                <div class="main-content d-flex flex-column min-vh-100 px-md-4">
                    <!-- Toggle Button Area -->
                    <div
                        class="pt-3 pb-2 mb-3 d-flex align-items-center justify-content-between px-1 px-md-0 d-md-none">
                        <button class="btn btn-outline-secondary toggle-sidebar" type="button"
                            data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu"
                            style="color: #333333; border-color: #333333;">
                            <i class="fa-solid fa-bars"></i>
                        </button>
                    </div>

                    <div class="main-layout-wrapper">
                        <div class="left-content-area">
                            <div id="chat-scroll-area" class="scrollable-content">
                                <div id="start-view" class="view-container">
                                    <h2 class="main-area-header">Start a new design or continue a recent one.</h2>
                                    <div class="upload-zone position-relative" id="upload-drop-zone">
                                        <i class="fa-solid fa-cloud-arrow-up upload-zone-icon" id="upload-icon"></i>

                                        <img id="preview-img" style="display: none; max-width: 100%; max-height: 100%; border-radius: 8px; overflow: hidden;" />
                                        <span id="remove-preview" style=""><i class="fa-solid fa-xmark"></i></span>
                                        <%--position:absolute; top:6px; right:6px; cursor:pointer; background:#000; color:#fff; border-radius:50%; width:20px; height:20px; font-size:14px; line-height:20px; text-align:center; display:none;--%>
                                        <div class="upload-zone-title">
                                            Upload or paste an<br>
                                            image to start
                                        </div>
                                        <div class="upload-zone-subtitle">JPG, PNG · up to 10 MB</div>

                                        <a class="upload-zone-btn" id="upload-btn">Upload Photo <i class="fa-solid fa-arrow-up-from-bracket"></i>
                                        </a>
                                    </div>
                                    <!-- Input Bar (initially below upload zone) -->
                                </div>
                                <div id="chat-messages" class="w-100 d-flex flex-column">
                                </div>
                            </div>
                            <div id="promptsec" class="fixed-input-container" runat="server">
                                <div class="input-area-wrapper">
                                    <!-- Dynamic Input Bar -->
                                    <div id="prompt-preview-container" style="display: none;">
                                        <img id="preview-img" style="display: none; max-width: 80px; max-height: 100%; border-radius: 8px; position: static;" />
                                        <span id="remove-preview" style="" class="remove-preview1"><i class="fa-solid fa-xmark"></i></span>
                                    </div>
                                    <input type="file" id="file-input" hidden />
                                    <div class="floating-input-bar" id="shared-input-bar">
                                        <i class="fa-solid fa-wand-magic-sparkles"></i>
                                        <input type="text" id="prompt" placeholder="Describe a change or new design idea...">
                                        <div class="credits" id="showCreds" runat="server">
                                            <span id="Creditused">0</span> / <span id="Credittotal"></span>
                                        </div>
                                        <a href="javascript:void(0);" id="upload-btn1"><i class="fa-solid fa-upload ms-2 text-muted" style="cursor: pointer;"></i></a>
                                        <button type="button" id="Submitbtn" class="send-btn" onclick="Submit(1, '');">
                                            <i id="sendIcon" class="fa-regular fa-paper-plane"></i>
                                        </button>
                                    </div>
                                    <p class="input-disclaimer mt-2 mb-0">
                                        GemArt AI can make mistakes. Check important
                                        info.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="right-details-panel" id="right-details-panel">
                            <!-- Header (changes per view) -->
                            <div class="right-panel-header w-100 mb-3 d-flex justify-content-between align-items-center">
                                <h5 id="right-panel-title" class="fw-bold mb-0" style="color: #0f172a;">Design details</h5>
                                <button class="btn border-0 p-0 d-md-none" id="close-right-panel"
                                    style="font-size: 1.25rem; color: #64748b;">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>

                            <div id="price-skeleton-view" class="w-100 d-flex flex-column align-items-center">
                                <div class="right-panel-placeholder"></div>
                                <i class="fa-solid fa-circle-info right-panel-icon"></i>
                                <p class="right-panel-text">Design details will appear here.</p>
                                <div class="right-panel-skeleton-card">
                                    <div class="right-panel-skeleton"></div>
                                    <div class="right-panel-skeleton"></div>
                                    <div class="right-panel-skeleton short"></div>
                                </div>
                            </div>

                            <div id="detailview" class="w-100"></div>
                            <div id="priceview" class="w-100"></div>

                            <!-- Generate Button (visible when a design is selected) -->
                            <div id="generate-details-container" class="mt-3 w-100 d-none">
                                <a class="btn w-100 py-2 d-flex align-items-center justify-content-center gap-2" id="generatedetails" href="javascript:void(0);" style="background-color: #1e3a5f; color: white; border-radius: 8px;">
                                    <i class="fa-solid fa-rotate"></i>Generate Details
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        <asp:Label ID="lblguest" runat="server" class="py-5 d-flex justify-content-center align-items-center h-100"></asp:Label>
    </div>

    <!--Jewel Pricing -->
    <div class="modal fade" id="basicModal2" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header py-2 px-3">
                    <h5 class="modal-title">Jewelry Pricing</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                </div>
                <div class="modal-body">

                    <div class="fingersize mb-4 d-flex flex-row align-items-center w-25 gap-2">
                        <label>Fingersize:</label>
                        <select class="form-select fingsize">
                            <option disabled="disabled" selected="selected">Select option</option>
                        </select>
                    </div>

                    <div class="metaledit">
                        <div class="row row-cols-sm-4 row-cols-2">
                            <div class="col">
                                <label class="mb-1">Metal Type: <span class="text-danger" aria-label="required">*</span></label>
                                <div class="mettype"></div>
                            </div>
                            <div class="col">
                                <label class="mb-1">Metal Color: <span class="text-danger" aria-label="required">*</span></label>
                                <div class="metcolor"></div>
                            </div>
                            <div class="col">
                                <label class="mb-1">Metal Purity: <span class="text-danger" aria-label="required">*</span></label>
                                <div class="metpurity"></div>
                            </div>
                            <div class="col">
                                <label>Metal Weight (gms): <span class="text-danger" aria-label="required">*</span></label>
                                <input type="number" class="form-control pe-2 metweight" name="metweight" placeholder="Enter weight" min="1" max="1000">
                                <span class="invalid-feedback"></span>
                            </div>
                        </div>
                    </div>

                    <div class="stonet row row-cols-2 mt-4 mb-3">
                        <div class="col">
                            <label for="stoneType">Stone Present? <span class="text-danger" aria-label="required">*</span></label>
                            <div class="isStone">
                                <label class="me-2 mt-1 radio-label">
                                    <input type="radio" name="isStone" value="yes" class="form-check-input" checked>
                                    Yes
                                </label>
                                <label class="me-2 mt-1 radio-label">
                                    <input type="radio" name="isStone" value="no" class="form-check-input">
                                    No
                                </label>
                            </div>
                        </div>
                        <div class="col stonetypep">
                            <label for="stoneType">Stone Type? <span class="text-danger" aria-label="required">*</span></label>
                            <div class="stoneType"></div>
                        </div>
                    </div>

                    <div class="stone-row">
                        <div class="stone-entry row row-cols-md-6 row-cols-2">
                            <div class="col">
                                <label for="typeofStone">Type of stone: <span class="text-danger" aria-label="required">*</span></label>
                                <select class="form-select typeofStone">
                                    <option disabled="disabled" selected="selected">Select option</option>
                                </select>
                            </div>
                            <div class="col">
                                <label for="clarity">Clarity: <span class="text-danger" aria-label="required">*</span></label>
                                <select class="form-select clarity">
                                    <option disabled="disabled" selected="selected">Select option</option>
                                </select>
                            </div>
                            <div class="col">
                                <label for="cutType">Cut type: <span class="text-danger" aria-label="required">*</span></label>
                                <select class="form-select cuttype">
                                    <option disabled="disabled" selected="selected">Select option</option>
                                </select>
                            </div>
                            <div class="col">
                                <label for="dimensions">Carat: <span class="text-danger" aria-label="required">*</span></label>
                                <input type="number" class="form-control pe-2 carat" min="1" max="1000" />
                                <span class="invalid-feedback"></span>
                            </div>
                            <div class="col noofstone">
                                <label for="noofstone">No. of stone: <span class="text-danger" aria-label="required">*</span></label>
                                <input type="number" class="form-control pe-2 numofstone" min="1" max="1000" />
                                <span class="invalid-feedback"></span>
                            </div>
                            <div class="col crudbutton d-flex align-items-end">
                                <button type="button" class="btn btn-primary add-stone"><i class="bi bi-plus-circle"></i></button>
                                <button type="button" class="btn delete-stone"><i class="bi bi-trash text-dark"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <a id="updetails" href="javascript:void(0);" class="btn btn-primary">Update & Get price</a>
                </div>
            </div>
        </div>
    </div>
    <!--Jewel Pricing - End -->

    <!--Error Model -->
    <div class="modal show" id="ErrorModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content d-flex align-items-center p-5  rounded-3 shadow border-0">
                <div class="text-center">
                    <i class="fa fa-solid fa-clock"></i>
                    <h3 class="fw-bold fs-3">Al Assistant is Temporarily Unavailable</h3>
                </div>
                <p>Our AI service provider, OpenAI, is currently experiencing a brief outage. This is an external issue, and no action is required on your end. We recommend trying again in a few minutes; service will resume automatically once they are back online.</p>
                <div class="d-flex align-items-center w-100 gap-3 mb-4 py-3">
                    <a href="/<%= PgName %>" class="btn btn-primary w-100">Try Again</a>
                    <a href="javascript:void(0);" class="btn btn-secondary w-100" data-bs-dismiss="modal" aria-hidden="true">Close</a>
                </div>
                <p>If this persists, check back later. Service will resume automatically.</p>
                <a href="javascript:void(0);" class="supportbtn">Contact Support  <i class="fa-solid fa-up-right-from-square"></i></a>
            </div>
        </div>
    </div>
    <!--Error Model - End -->

    <!--AI Studio Model -->
    <div class="modal fade" id="Aistudio" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header py-2 px-3">
                    <h5 class="modal-title text-center">AI STUDIO</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">

                        <div class="row">
                            <!-- Left Side Gallery -->
                            <div class="col-md-6">
                                <div class="lSSlideOuter">
                                    <div class="lSSlideWrapper usingCss">
                                        <ul id="studio-gallery" class="gallery list-unstyled lightSlider lsGrab lSSlide">
                                        </ul>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                            <!-- Right Side Content -->
                            <div class="col-md-6">
                                <p id="showCaption">Unable to fetch Caption.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--AI Studio Model - End -->

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="FooterSection" runat="Server">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lightslider/1.1.6/js/lightslider.min.js" referrerpolicy="no-referrer"></script>
    <script>
        function applyReadMore() {
            $('.aistusec p#copyText').each(function () {

                if ($(this).data('readmore')) return;

                const fullText = $(this).text().trim();
                const words = fullText.split(/\s+/);

                if (words.length <= 14) return;

                const shortText = words.slice(0, 14).join(' ');

                $(this)
                    .data('readmore', true)
                    .html(`
                <span class="short-text">${shortText}...</span>
                <span class="full-text d-none">${fullText}</span>
                <a href="javascript:void(0)" class="read-more btn btn-link p-0 ms-1">Read more</a>
            `);
            });
        }

        $(document).ready(function () {



            $(document).on('click', '#aiStudio', function () {
                loaderAiStudio("on", $(this));
                const parent = $(this).closest(".resultdetails");
                var Image = parent.data("image") || "";
                if (Image == "") {
                    Image = $("#<%= GenImage1.ClientID %>").val() || "";
                }
                var caption = parent.attr("data-caption") || "";
                var CustID = $("#<%= CustIDs.ClientID %>").val() || 0;
                $.ajax({
                    url: '<%=ResolveUrl(PgName + "/GenerateLiveGallery")%>',
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify({
                        CustID: CustID,
                        ThreadID: parent.data("threadid") || "",
                        Image: Image,
                        Code: parseInt(parent.data("code")) || 0,
                        CadID: parseInt(parent.data("cadid")) || 0,
                        ItmType: parent.data("part") || ""
                    }),
                    success: function (res) {
                        if (!res.d.IsCompleted || res.d.Result == "Caption generation failed") {
                            ErrorPopup(1);
                            loaderAiStudio("off", $(this));
                            return;
                        }
                        loaderAiStudio("off", $(this));
                        parent.closest(".singleholder").append(res.d.Result);
                        parent.find("#aiStudio").addClass('d-none');
                        initLightbox();
                    }
                });
            });

            function loaderAiStudio(state, $btn) {
                const $icon = $btn.find('#aiicon');

                if (state === "on") {
                    $icon.removeClass('fa-wand-magic-sparkles').addClass('fa-spinner fa-spin');
                    $btn.prop('disabled', true);
                } else {
                    $icon.removeClass('fa-spinner fa-spin').addClass('fa-wand-magic-sparkles');
                    $btn.prop('disabled', false);
                }
            }

            $(document).on('click', '.read-more', function () {
                const p = $(this).closest('p');
                const isExpanded = !p.find('.full-text').hasClass('d-none');

                p.find('.short-text, .full-text').toggleClass('d-none');
                $(this).text(isExpanded ? 'Read more' : 'Read less');
            });
        });



    </script>

    <script>
        // Sidebar & Toggles
        document.querySelectorAll('.toggle-sidebar').forEach(btn => {
            btn.onclick = () => document.body.classList.toggle('sidebar-collapsed');
        });
    </script>
    <%-- CREDITS --%>
    <script>
        let Creditused = 0;
        let Credittotal = $("#<%= credits.ClientID %>").val();

        $(window).on('load', function () {
            updateCredits();
            UploadCAD();
        });

        function UploadCAD() {
            var UploadImg = $("#<%= CadUpload.ClientID %>").val();
            if (UploadImg && UploadImg.length > 0) {
                showPreview(UploadImg);
                UploadImage = UploadImg;
            }
        }

        function updateCredits(Creditused) {
            $('#Creditused').text(Creditused);
            $('#Credittotal').text(Credittotal);
        }
    </script>

    <script>
        let UploadImage = null;
        let activeDetails = null;
        let attemptCount = 0;
        const $main = $('#chat-messages');
        const $mainDet = $('#detailresponse');
        const $rightpnl = $('#right-details-panel');

        // IMAGE UPLOAD
        $(document).ready(function () {
            $('#prompt').on('keydown', function (e) {
                if (e.key === 'Enter' || e.keyCode === 13) {
                    e.preventDefault();
                    $('#Submitbtn').click();
                }
            });
        });

        function showPreview(file) {
            if (!file) return;

            if (typeof file === "string") {
                $('#preview-img').attr('src', file).show();
                $('#remove-preview').addClass("d-flex");
                $('#prompt-preview-container').show();
                return;
            }

            const allowedExt = ['jpg', 'jpeg', 'png', 'webp'];
            const fileName = file.name.toLowerCase();
            const fileExt = fileName.split('.').pop();

            const isImageType = file.type && file.type.startsWith('image/');
            const isAllowedExt = allowedExt.includes(fileExt);

            if (!isImageType && !isAllowedExt) {
                $('#file-input').val('');
                return;
            }

            UploadImage = file;

            const reader = new FileReader();
            reader.onload = function (e) {
                const $img = $('#preview-img');
                $img.attr('src', e.target.result).show();
                $('#remove-preview').addClass("d-flex");
                $('#prompt-preview-container').show();
            };
            reader.readAsDataURL(file);
        }

        $(document).ready(function () {

            $('#file-input').on('change', function () {
                if (this.files && this.files[0]) {
                    showPreview(this.files[0]);
                }
            });

            $('#upload-btn, #upload-btn1').on('click', function (e) {
                e.preventDefault();
                $('#file-input').click();
            });


            $('#remove-preview, .remove-preview1').on('click', function () {
                UploadImage = null;
                clearPreviewImage();
            });

            $('#mainsection').on('paste', function (e) {
                const items = (e.originalEvent.clipboardData || {}).items || [];
                for (let i = 0; i < items.length; i++) {
                    if (items[i].type.includes('image')) {
                        showPreview(items[i].getAsFile());
                        e.preventDefault();
                        break;
                    }
                }
            });

            $('#mainsection').on('dragover', function (e) {
                e.preventDefault();
            });

            $('#mainsection').on('drop', function (e) {
                e.preventDefault();
                const files = e.originalEvent.dataTransfer.files;
                if (files && files[0]) {
                    showPreview(files[0]);
                }
            });
        });
        function clearPreviewImage() {
            $('#preview-img').attr('src', '').hide();
            $('#remove-preview').toggleClass("d-flex");
            $('#file-input').val('');
            $('#prompt-preview-container').hide();
        }

        //LOADER FUNCTION
        function loader(state) {
            const $icon = $('#sendIcon');
            const $btn = $('#Submitbtn');

            if (state === "on") {
                $icon.removeClass('fa-regular fa-paper-plane')
                    .addClass('fa-solid fa-spinner fa-spin');
                $btn.prop('disabled', true);
            } else {
                $icon.removeClass('fa-solid fa-spinner fa-spin')
                    .addClass('fa-regular fa-paper-plane');
                $btn.prop('disabled', false);
            }
        }

        // STATEMENT PRINTING
        function userRequest(prompt) {
            let html = `<div class="chat-bubble user-bubble">${prompt}`;
            if (UploadImage) {
                const previewSrc = document.getElementById("preview-img").src;
                html += `<div class="chat-image w-50 w-sm-50"><a href="${previewSrc}" class="gallery-lightbox preview-link"><img src="${previewSrc}" class="img-fluid mb-0 rounded" style="max-width: 120px; height: auto; border-radius: 20px;" /></a></div>`;
            }
            html += `</div>`;
            $main.append(html);
            clearPreviewImage();
            loader("on");
            loaderPrint("Bringing your vision to life… One sparkle at a time.");
        }
        function Print(data, Switch = 0) {
            var html = "";
            if (Switch = 0) {
                html = `<div class="chat-image-result mb-4 w-100 d-flex flex-column error">
                        <p class="m-0 chat-text">${data}</p>
                    </div>`;
            } else {
                html = `<div class="chat-image-result mb-4 w-100 d-flex flex-column result">
                                <p class="m-0 chat-text">${data}</p>
                            </div>`;
            }
            $main.append(html);
        }

        function ErrorPopup(switches = 0) {
            if (switches == 1) {
                var modal = new bootstrap.Modal(document.getElementById('ErrorModal'));
                modal.show();
            } else {
                var modal = new bootstrap.Modal(document.getElementById('ErrorModal'));
                modal.hide();
            }

        }

        function loaderPrint(data) {
            let html = `<div class="chat-image-result mb-4 w-100 d-flex flex-column loader">
                                    <div class="gemloader"></div>
                                    <div class='typewriterr m-0 chat-text'></div>
                                </div>`;
            let $loader = $(html);
            $main.append($loader);
            loopTypewriterEffect($loader.find('.typewriterr'), data);
        }
        function loopTypewriterEffect($element, text, speed = 70, pause = 600) {
            let i = 0;
            function type() {
                if (i < text.length) {
                    $element.append(text.charAt(i));
                    i++;
                    setTimeout(type, speed);
                } else {
                    setTimeout(() => {
                        $element.text('');
                        i = 0;
                        type();
                    }, pause);
                }
            }
            type();
        }

        async function Submit(attempt, threadID) {
            var prompt = $('#prompt').val().replace(/&amp;/g, "and").replace(/&/g, "and").replace(/'/g, "").replace(/\"/g, "#@#").replace(/[\/\\'"]/g, "");
            $('#prompt').val('');
            loader("on");
            var GenImage = $("#<%= GenImage1.ClientID %>").val() || "";
            if (prompt.length < 1) {
                Print("Please enter some text to continue...!!");
                //updateSuggestions("show");
            }
            else {
                attemptCount++;
                userRequest(prompt);
                $main.siblings('#start-view').remove();
                if (!UploadImage) {
                    const checkprompt = await checkPromptVal(prompt, threadID, GenImage);
                    if (checkprompt.toLowerCase() == 'complete' || checkprompt.includes('Complete')) {
                        GenerateImage(prompt, attempt, threadID, "");
                    } else {
                        showMissingPromptPopup(checkprompt, prompt, attempt, threadID, "");
                    }
                } else {
                    ImageUploadAI(prompt, attempt, threadID);
                }
            }
        }

        // CHECKING
        function checkPromptVal(prompt, ThreadID, Image) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: '<%=ResolveUrl(PgName + "/CheckPromptVal")%>',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ prompt: prompt, ThreadID: ThreadID, Image: Image }),
                    success: function (res) {
                        resolve(res.d || "error");
                    },
                    error: function (xhr) {
                        console.error('CheckPromptVal error:', xhr);
                        ErrorPopup(1);
                    }
                });
            });
        }

        function showMissingPromptPopup(checkprompt, prompt, attempt, ThreadID, UploadImage) {
            if (checkprompt.includes('^')) {
                const map = {
                    a: "- Metal type & purity (e.g., 14K Yellow Gold)",
                    b: "- Approx. gold weight",
                    c: "- Center stone type, shape & carat weight",
                    d: "- No. of side stones & total carat weight"
                };
                checkprompt = checkprompt.replace(/[\r\n]+/g, "^");
                var parts = checkprompt.split("^");
                var isValid = parts.every(m => map[m]);

                var items = isValid ? parts.map(m => `<li>${map[m]}</li>`).join("") : Object.values(map).map(txt => `<li>${txt}</li>`).join("");
                $('.missingdetails, .loader').remove();
                var html = `<div class="chat-image-result mb-4 w-100 d-flex flex-column align-items-center missingdetails">
                    <p class="m-0 chat-text">Some important details seem to be missing.<br/>
                        To generate the most accurate design and quote, please include:</p>
                        <ul>${items}</ul>
                    <div class="mt-3 d-flex gap-2 justify-content-center">
                        <button id="btnYesContinue" class="btn btn-primary btn-sm action-flow-btn btnLoadMore">Continue Anyway</button>
                        <button id="btnNoStop" class="btn btn-primary btn-sm action-flow-btn btnLoadMore">Add Details</button>
                    </div>
                </div>`;

                $main.append(html);

                $('#btnYesContinue').on('click', function () {
                    $('.missingdetails').remove();
                    loaderPrint("Bringing your vision to life… One sparkle at a time.");
                    if (!UploadImage) {
                        GenerateImage(prompt, 1, "", "");
                    }
                    else {
                        ImageUploadAI(prompt, 1, "");
                    }
                });

                $('#btnNoStop').on('click', function () {
                    $('.missingdetails').remove();
                    loader("off");
                    $('#prompt').val(prompt);
                });
            }
            else if (checkprompt.toLowerCase() == 'break detail' || checkprompt.includes('Break') || checkprompt.toLowerCase() == 'break change' || checkprompt.toLowerCase() == 'break') {
                $('.missingdetails, .loader').remove();
                var html = `<div class="chat-image-result mb-4 w-100 d-flex flex-column align-items-center missingdetails">
                                        <p class="m-0 chat-text">The prompt is not related to the topic, We recommed you to start a new chat.</p>
                                        <div class="mt-3 d-flex gap-2 justify-content-center">
                                            <a href='javascript:void(0);' id="btnstartnew" class="btn btn-primary btn-sm action-flow-btn btnLoadMore">Start new chat</a>
                                            <a href='javascript:void(0);' id="btnconhere" class="btn btn-primary btn-sm action-flow-btn btnLoadMore">Continue here</a>
                                        </div>
                                    </div>`;
                $main.append(html);

                $('#btnstartnew').on('click', function () {
                    location.reload();
                });

                $('#btnconhere').on('click', function () {
                    $('.missingdetails').remove();
                    loaderPrint("Bringing your vision to life… One sparkle at a time.");
                    if (checkprompt.includes('Detail')) {
                        GenerateImageDetails(prompt, attempt, ThreadID, UploadImage);
                    } else {
                        GenerateImage(prompt, attempt, ThreadID, UploadImage);
                    }
                });
            }
            else if (checkprompt.toLowerCase() == 'image detail' || checkprompt.includes('image detail') ||
                checkprompt.toLowerCase() == 'continue detail' || checkprompt.includes('continue detail')) {
                GenerateImageDetails(prompt, attempt, ThreadID, UploadImage);
            }
            else if (checkprompt.toLowerCase() == 'image change' || checkprompt.includes('image change') ||
                checkprompt.toLowerCase() == 'continue change' || checkprompt.includes('continue change')) {
                GenerateImage(prompt, attempt, ThreadID, UploadImage);
            }
            else if (checkprompt.toLowerCase() == 'not jewelry' || checkprompt.includes('Not Jewelry')) {
                $('.missingdetails, .loader').remove();
                var html = `<div class="chat-image-result mb-4 w-100 d-flex flex-column align-items-center missingdetails">
                                        <p class="m-0 chat-text">Your prompt doesn't seem to be specifically related to jewelry. Please refine your request to focus on jewelry designs, as our tool specializes in creating imagery for the jewelry industry.</p>
                                    </div>`;
                $main.append(html);
                loader("off");
            }
            else {
                $('.missingdetails, .loader').remove();
                var cleanThreadID = ThreadID.replace(/\s+/g, '');
                var html = `<div class="chat-image-result mb-4 w-100 d-flex flex-column align-items-center missingdetails">
                                        <p class="m-0 chat-text">We encountered an internal error. Please reload the page and select the chat again, or start a new conversation.</p>
                                         <div class="mt-3 d-flex gap-2 justify-content-center">
                                             <a href='${window.location.href}?TId=${cleanThreadID}' id="btnstartnew" class="btn btn-primary btn-sm action-flow-btn btnLoadMore">Refresh chat</a>
                                             <a href='javascript:void(0);' id="btnstartnew" class="btn btn-primary btn-sm action-flow-btn btnLoadMore">Start new chat</a>
                                         </div>
                                    </div>`;
                ErrorPopup(1);
                $main.append(html);
                loader("off");
            }
        }

        function ImageUploadAI(prompt, attempt, ThreadID) {
            if (!UploadImage) {
                alert("Please upload an image first.");
                return;
            }

            const formData = new FormData();

            if (typeof UploadImage === "string" && UploadImage.startsWith("http")) {
                formData.append("imageUrl", UploadImage);
            } else {
                formData.append("file", UploadImage);
            }
            // CLEAR CAD
            $("#<%= CadUpload.ClientID %>").val();
            $.ajax({
                type: 'POST',
                url: '/UploadImage.ashx',
                data: formData,
                contentType: false,
                processData: false,
                async: true,
                cache: false,
                success: function (data) {

                    var parts = data.split(':');

                    if (parts.length === 2) {
                        var status = parts[0].trim();
                        var imagename = parts[1].trim();

                        if (status === "success") {

                            checkPromptVal(prompt, ThreadID, imagename).then(checkprompt => {
                                if (checkprompt.toLowerCase() === "image change" || checkprompt.includes("change")) {
                                    GenerateImage(prompt, attempt, ThreadID, imagename);
                                }
                                else if (checkprompt.toLowerCase() === "image detail" || checkprompt.includes("image detail")) {
                                    GenerateImageDetails(prompt, attempt, ThreadID, imagename);
                                }
                                else {
                                    showMissingPromptPopup(checkprompt, prompt, attempt, ThreadID, imagename);
                                }
                                clearPreviewImage();
                                UploadImage = null;
                            });

                        } else if (status === "noimage") {
                            loader("off");
                            $main.find('.loader').remove();
                            Print("Unable to read image. Try re-uploading the image.");
                        } else {
                            loader("off");
                            $main.find('.loader').remove();
                            Print(data);
                        }
                    } else {
                        loader("off");
                        $main.find('.loader').remove();
                        Print(data);
                    }
                },
                error: function (response) {
                    loader("off");
                    $main.find('.loader').remove();
                    ErrorPopup(1);
                }
            });
            clearPreviewImage();
            UploadImage = null;
        }

        function GenerateImage(prompt, attempt, ThreadID, UploadImage) {
            ThreadID = (ThreadID || '').trim();
            var attempt = parseInt(attempt, 10) || 0;
            var txtcredits = parseInt($("#<%= credits.ClientID %>").val()) || 0;
            var GenImage1 = $("#<%= GenImage1.ClientID %>").val() || "";
            var CustID = $("#<%= CustIDs.ClientID %>").val() || 0;
            var CadID = $("#<%= CadIDs.ClientID %>").val() || 0;

            $.ajax({
                url: '<%=ResolveUrl(PgName + "/GenerateImage")%>',
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({
                    attempt: attempt,
                    ThreadID: ThreadID,
                    Prompt: prompt,
                    UploadImage: UploadImage,
                    GenImage1: GenImage1,
                    CadID: CadID,
                    CustID: CustID,
                    tstcredits: txtcredits
                }),
                success: function (res) {
                    const result = res.d.Result;
                    if (result.loggedout === true) {
                        window.location.href = "login.aspx";
                        return;
                    }
                    if (result.isValid === true) {
                        $main.append(result.html);
                        $('#<%= ThreadID.ClientID %>').val(result.ThreadID);
                        $('#<%= GenImage1.ClientID %>').val(result.GenImage1);
                        $('#<%= credits.ClientID %>').val(result.Credits);
                        $('#Submitbtn').attr("onclick", "Submit(" + (attempt + 1) + ", '" + result.ThreadID + "')");
                        Creditused++;
                        updateCredits(Creditused);
                        GenerateGemImage(prompt, UploadImage);
                        $("#<%= CadIDs.ClientID %>").val("");
                    } else {
                        if (result.html.includes("credits")) {
                            Print(result.html);
                        } else {
                            Print("The request timed out. Please try again later.");
                        }
                    }
                    $main.find('.loader, .error').remove();
                    loader("off");
                    initLightbox();
                },
                error: function (xhr, status) {
                    $main.find('.loader, .error').remove();
                    loader("off");
                    ErrorPopup(1);
                }
            });
        }

        function GenerateGemImage(prompt, UploadImage) {
            const upimgclass = $main.find(".singleholder.opacity-50.pe-none");
            var Code = upimgclass.find('.resultdetails').data('code');
            var ThreadID = (upimgclass.find('.resultdetails').data('threadid') || '').trim();
            var GenImage2 = $("#<%= GenImage2.ClientID %>").val() || "";
            var CustID = $("#<%= CustIDs.ClientID %>").val() || 0;
            var CadID = $("#<%= CadIDs.ClientID %>").val() || 0;
            $.ajax({
                url: '<%=ResolveUrl(PgName + "/GenerateGemImage")%>',
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({
                    ThreadID: ThreadID,
                    Prompt: prompt,
                    UploadImage: UploadImage,
                    GenImage2: GenImage2,
                    CadID: CadID,
                    CustID: CustID,
                    Code: Code
                }),
                success: function (res) {
                    const image = res.d;
                    
                    const imgUrl = "https://aidev1.cloudwebsitesolutions.com/img/gemart/medium/" + image;
                    $('#<%= GenImage2.ClientID %>').val(imgUrl);
                    upimgclass.find(".resultdetails").attr("data-image", image);
                    upimgclass.find("a.preview-link").attr("href", imgUrl);
                    upimgclass.find("#generatedimg").attr("src", imgUrl).removeClass("d-none");
                    upimgclass.find(".gemloader").remove();
                    upimgclass.removeClass("opacity-50 pe-none");
                    initLightbox();
                },
                error: function (xhr, status) {
                    $main.find('.loader, .error').remove();
                    loader("off");
                    ErrorPopup(1);
                }
            });
        }

        function GenerateImageDetails(prompt, attempt, ThreadID, UploadImage) {
            ThreadID = (ThreadID || '').trim();
            var attempt = parseInt(attempt, 10) || 0;
            var Credits = $("#<%= credits.ClientID %>").val() || 0;
            var GenImage = $("#<%= GenImage1.ClientID %>").val() || "";
            var CustID = $("#<%= CustIDs.ClientID %>").val() || 0;
            var CadID = $("#<%= CadIDs.ClientID %>").val() || 0;
            $.ajax({
                url: '<%=ResolveUrl(PgName + "/GenerateDetails")%>',
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({
                    CustID: CustID,
                    CadID: CadID,
                    Prompt: prompt,
                    Attempt: attempt,
                    ThreadID: ThreadID,
                    UploadImage: UploadImage,
                    GenImage: GenImage,
                    Credits: Credits,
                    Code: 0,
                    ProdType: "",
                    itemType: "chatgpt"
                }),
                success: function (res) {
                    const result = res.d.Result;
                    if (result.loggedout === true) {
                        window.location.href = "login.aspx";
                        return;
                    }
                    if (result.isValid === true) {
                        $main.append(result.html);
                        $('#<%= ThreadID.ClientID %>').val(result.ThreadID);
                        $('#<%= GenImage1.ClientID %>').val(result.GenImage1);
                        $('#<%= credits.ClientID %>').val(result.Credits);
                        $('#Submitbtn').attr("onclick", "Submit(" + (attempt + 1) + ", '" + result.ThreadID + "')");
                        $main.find('.chat-image-result #viewbreakdown').last().trigger('click');
                        Creditused++;
                        updateCredits(Creditused);
                        $("#<%= CadIDs.ClientID %>").val("");
                    } else {
                        Print(result.html);
                    }
                    $main.find('.loader, .error').remove();
                    loader("off");
                    initLightbox();
                },
                error: function (xhr, status) {
                    $main.find('.loader, .error').remove();
                    ErrorPopup(1);
                    loader("off");
                }
            });
        }

        $(document).on('click', '#viewbreakdown', function () {
            activeDetails = $(this).closest(".resultdetails");
            const $revertactive = $('.resultdetails.active');
            $("#price-skeleton-view, #generate-details-container").removeClass("d-none");
            DetailbuttonLoader("on");
            $("#detailview, #priceview").addClass("d-none");
            $revertactive.find('#viewbreakdown').text("View Breakdown");
            $revertactive.removeClass("active");
            activeDetails.addClass("active");
            activeDetails.find('#viewbreakdown').text("Selected");
            ImageDetails();
            //renderVariants(activeDetails);
        });

        function ImageDetails() {

            var reqJson = activeDetails.find('.reqpriceJson').val();
            var resJson = activeDetails.find('.respriceJson').val();
            if (reqJson) {
                const obj = JSON.parse(reqJson);
                const parts = (activeDetails.find('.prodDetail').val() || "").split("^");
                const type = parts[0] || "";
                const fingersize = parts[1] || "";
                const html = TableView(obj, type, fingersize, activeDetails);
                $rightpnl.find("#price-skeleton-view, #generate-details-container").addClass('d-none');
                $rightpnl.find('#detailview').html(html).removeClass('d-none');
                if (resJson.length > 0) {
                    Displayprice(resJson, "");
                }
                return;
            }

            var attempt = activeDetails.data("attempt");
            var image = activeDetails.data("image");
            var code = activeDetails.data("code");
            var threadId = activeDetails.data("threadid");
            var prompt = activeDetails.data("prompt");
            var credits = $('#<%= credits.ClientID %>').val() || 0;
            var ProdType = activeDetails.data("prodtype");
            var itemType = activeDetails.data("part");
            var CustID = $("#<%= CustIDs.ClientID %>").val() || 0;
            var CadID = $("#<%= CadIDs.ClientID %>").val() || 0;
            if (CadID == 0) {
                var CadID = activeDetails.data("cadid");
            }
            $.ajax({
                type: "POST",
                url: "<%= ResolveUrl(PgName + "/GenerateDetails") %>",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({
                    CustID: CustID,
                    CadID: CadID,
                    Prompt: prompt,
                    Attempt: attempt,
                    ThreadID: threadId,
                    UploadImage: "",
                    GenImage: image,
                    Credits: credits,
                    Code: code,
                    ProdType: ProdType,
                    itemType: itemType
                }),
                success: function (res) {
                    var data = res.d.Result;
                    if (!data.isValid) return;
                    const obj = JSON.parse(data.reqJson);
                    DetailbuttonLoader("off");
                    const { type, fingersize, price } = obj.price_for[0].jewelry[0];
                    const datetime = new Date().toISOString();
                    const html = TableView(obj, type, fingersize, activeDetails);
                    $rightpnl.find("#price-skeleton-view, #generate-details-container").addClass('d-none');
                    $rightpnl.find('#detailview').html(html).removeClass('d-none');
                    activeDetails.find('.reqpriceJson').val(JSON.stringify(obj));
                    activeDetails.find('.prodDetail').val(type + "^" + fingersize + "^" + datetime + "^" + price);
                    activeDetails.find('.prodattempt').val(1);
                    $("#<%= CadIDs.ClientID %>").val("");
                    initLightbox();
                },
                error: function () {
                    DetailbuttonLoader("off");
                    $rightpnl.find("#price-skeleton-view, #generate-details-container").addClass('d-none');
                    $rightpnl.find('#detailview').html("The server error occured. Please try again later.").removeClass('d-none');
                }
            });
        }
        function DetailbuttonLoader(switches) {
            const btn = $rightpnl.find('#generatedetails');
            if (switches === "on") {
                btn.html('<i class="fa-solid fa-spinner fa-spin"></i> Generating...').attr('disabled', true).css('opacity', '.7');
            } else {
                btn.html('Generate Details').attr('disabled', false).css('opacity', '1');
            }
        }
        function TableView(reqJson, Prodtype, FingerSize, container) {
            activeDetails = container;
            const data = reqJson.price_for[0];
            const showFS = FingerSize && ["ring", "band"].includes((Prodtype || "").toLowerCase());
            let html = `<div class="d-flex justify-content-between mb-3">
                <div><strong>Product Type:</strong><br/> ${Prodtype || ""}</div>
                ${showFS ? `<div><strong>Finger Size:</strong><br/> ${FingerSize}</div>` : ``}
            </div>`;
            (data.metal || []).forEach((m, i) => {
                html += `<table class="table table-bordered table-sm mb-3">
                    <thead><tr><th colspan="2">Metal ${i + 1}</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Type:</strong></td><td>${m.type || ""}</td></tr>
                        <tr><td><strong>Purity:</strong></td><td>${m.purity ? m.purity + "k" : ""}</td></tr>
                        <tr><td><strong>Weight:</strong><span>(gms)</span><span>Gold weight is approximate and may vary in the final CAD</span></td><td>${m.weight || ""}</td></tr>
                        <tr><td><strong>Color:</strong></td><td>${m.color || ""}</td></tr>
                    </tbody>
                </table>`;
            });
            (data.stones || []).forEach((s, i) => {
                html += `<table class="table table-bordered table-sm mb-3">
                    <thead><tr><th colspan="2">Stones ${i + 1}</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Type:</strong></td><td>${s.stone_type || ""}</td></tr>
                        <tr><td><strong>Cut:</strong></td><td>${s.cut_type || ""}</td></tr>
                        <tr><td><strong>Carat Weight:</strong><span>(ct)</span></td><td>${s.size || ""}</td></tr>
                        <tr><td><strong>Qty:</strong></td><td>${s.quantity || ""}</td></tr>
                        <tr><td><strong>Clarity:</strong></td><td>${s.clarity || ""}</td></tr>
                    </tbody>
                </table>`;
            });
            html += `<div class='d-flex flex-column justify-content-between mb-3'>
            <a  id="editdetails" class="btn btn-light w-100 mb-2 py-2 d-flex align-items-center justify-content-center gap-2" style="border: 1px solid #ddd; border-radius: 8px;"><i class="fa-solid fa-pencil"></i>Edit Details</a>`;
            if ($('#<%=PriceAddon.ClientID %>').val() === "True") {
            html += `<a class="btn w-100 py-2 d-flex align-items-center justify-content-center gap-2" id="getprice" href="javascript:void(0);" style="background-color: #1e3a5f; color: white; border-radius: 8px;"><i class="fa-solid fa-hand-holding-dollar"></i>Get Price</a>`;
            }
            html += `</div>`;
            return html;
        }
    </script>

    <script>
        function FingerSizes() {
            const $select = $('.fingsize');
            $select.empty();
            $select.append('<option value="N/A">N/A</option>');
            for (let size = 1; size <= 16; size += 0.25) {
                const rounded = parseFloat(size.toFixed(2)).toString();
                const isSelected = (rounded === '7') ? 'selected' : '';
                $select.append(`<option value="${rounded}" ${isSelected}>${rounded}</option>`);
            }
        }
        // EDIT DETAILS
        $(document).on('click', '#editdetails', function () {
            FingerSizes();

            var pricingData = activeDetails.find('input.reqpriceJson').val();
            var fingerSize = activeDetails.find('input.prodDetail').val().split("^")[1];
            var productType = activeDetails.find('input.prodDetail').val().split("^")[0];
            JewelDetails(JSON.parse(pricingData), productType, fingerSize);
            var modal = new bootstrap.Modal(document.getElementById('basicModal2'));
            modal.show();
        });

        function JewelDetails(pricingData, productType, fingerSize) {
            let pricing = null;

            if (Array.isArray(pricingData)) {
                pricing = pricingData[0];
            } else if (pricingData && typeof pricingData === "object") {
                pricing = pricingData.price_for
                    ? pricingData.price_for[0]
                    : pricingData[0];
            }
            const $modal = $('#basicModal2');

            $modal.find(".fingersize").hide();
            $modal.find('h5.modal-title').text(`Jewelry Pricing - ${productType}`);
            const name = productType.trim().toLowerCase();
            if (name === "ring" || name === "band") {
                $modal.find(".fingersize").addClass('d-flex');
            }
            else {
                $modal.find(".fingersize").removeClass('d-flex');
            }

            // --- Metal (radios)
            const metal = pricing.metal[0];
            autoSelectOrAddRadio($modal.find('.mettype'), metal.type, 'metType');
            autoSelectOrAddRadio($modal.find('.metcolor'), metal.color, `color_${metal.type}`);
            if (metal.purity == "925" && metal.type == "") {
                $modal.find('.mettype input[type="radio"][value="platinum"]').prop('checked', true).trigger('change');
                metal.type = "platinum";
            }
            else if (metal.purity == "950" && metal.type == "") {
                $modal.find('.mettype input[type="radio"][value="silver"]').prop('checked', true).trigger('change');
                metal.type = "silver";
            }
            else {
                $modal.find('.mettype input[type="radio"][value="gold"]').prop('checked', true).trigger('change');
                metal.type = "gold";
            }
            autoSelectOrAddRadio($modal.find('.metpurity'), metal.purity, `purity_${metal.type}`);
            $modal.find('.metweight').val(metal.weight);
            const normalizedPurity = (metal.purity || '').toLowerCase().endsWith('k')
                ? metal.purity.toLowerCase()
                : metal.purity.toLowerCase() + 'k';

            purityHistory.set(1, normalizedPurity);

            if (pricing.stones.length > 0) {
                $modal.find('.isStone input[type="radio"][value="yes"]').prop('checked', true).trigger('change');
                $modal.find('.stoneType input[type="radio"][value="natural"]').prop('checked', true).trigger('change');
            }
            // --- Stones (dropdowns)
            const $tbody = $modal.find(".stone-row");
            const $baseRow = $tbody.find(".stone-entry").first();
            $tbody.find(".stone-entry:gt(0)").remove();
            pricing.stones.forEach((stone, i) => {
                const $row = i === 0 ? $baseRow : $baseRow.clone(true).appendTo($tbody);
                $row.attr("data-index", i);
                $row.find('select, input').each(function () {
                    const $el = $(this);
                    const baseName = $el.attr("name") || $el.attr("class").split(" ")[0];
                    const newId = `${baseName}-${i}`;
                    $el.attr("id", newId).attr("name", newId);
                });
                autoSelectOrAddOption($row.find('.typeofStone'), stone.stone_type || '');
                autoSelectOrAddOption($row.find('.clarity'), stone.clarity || '');
                autoSelectOrAddOption($row.find('.cuttype'), stone.cut_type || '');
                $row.find('.carat').val((stone.size || '').replace(/\s*ct\s*$/i, ''));
                $row.find('.numofstone').val(stone.quantity || '');
            });

            // --- If no stones, set isStone to "no" and trigger change
            if (!pricing.stones || pricing.stones.length === 0) {
                const $noStoneRadio = $modal.find('input[name="isStone"][value="no"]');
                if ($noStoneRadio.length) {
                    $noStoneRadio.prop('checked', true).trigger('change');
                }
            }
        }

        function autoSelectOrAddOption($select, value) {
            if (!$select || !$select.length || !value || value.trim() === "") return;

            value = value.trim();
            let found = false;

            $select.find("option").each(function () {
                if ($(this).val().toLowerCase() === value.toLowerCase()) {
                    found = true;
                    $select.val($(this).val()).trigger("change"); // Set exact match value
                    return false; // break loop
                }
            });

            if (!found) {
                $("<option>")
                    .val(value)
                    .text(value)
                    .appendTo($select);
                $select.val(value).trigger("change");
            }
        }
        function autoSelectOrAddRadio($container, value, name) {
            const inputVal = value.toLowerCase().trim();
            const radioName = name.toLowerCase().trim();

            const $radios = $container.find(`input[type="radio"][name="${radioName}"]`);
            const $match = $radios.filter(function () {
                return $(this).val().toLowerCase().includes(inputVal);
            });


            if ($match.length) {
                $match.prop('checked', true).trigger('change');
                //$match.closest('label').removeClass('d-none');
            } else {
                const id = `radio_${radioName}_${inputVal.replace(/\s+/g, '_')}`;
                const labelText = value.charAt(0).toUpperCase() + value.slice(1);
                const radioHTML = `
                    <label class="me-3 mt-1 radio-label active" for="${id}">
                        <input type="radio" name="${radioName}" value="${value}" id="${id}" class="form-check-input" checked>
                        ${labelText}
                    </label>`;
                $container.append(radioHTML);
                $container.find(`#${id}`).trigger('change');
            }
        }

        $(document).on("click", "#updetails", function () {
            if (!validation()) return;

            let fingerSize = "";

            const $modal = $('#basicModal2');
            const titleText = $modal.find('h5.modal-title').text();
            const productType = titleText.split(' - ')[1];

            const name = productType.trim().toLowerCase();
            if (name === "ring" || name === "band") {
                fingerSize = $modal.find('.fingsize').val() || "";
            }

            const metal = {
                type: $modal.find('.mettype input[type="radio"]:checked').val() || '',
                color: $modal.find('.metcolor input[type="radio"]:checked').val() || '',
                purity: ($modal.find('.metpurity input[type="radio"]:checked').val() || '').replace(/k$/i, ''),
                weight: $modal.find('.metweight').val() || ''
            };

            const stones = [];
            const isStone = $('.isStone input:checked').val()?.toLowerCase();
            if (isStone === 'yes') {
                $modal.find(".stone-entry").each(function () {
                    const $row = $(this);
                    const stone = {
                        stone_type: $row.find('.typeofStone').val() || '',
                        clarity: $row.find('.clarity').val() || '',
                        cut_type: $row.find('.cuttype').val() || '',
                        size: $row.find('.carat').val() ? $row.find('.carat').val() + 'ct' : '',
                        dim: '',
                        quantity: $row.find('.numofstone').val() || ''
                    };
                    if (stone.stone_type) stones.push(stone);
                });
            }

            pricingData = [{
                metal: [metal],
                stones: stones
            }];

            const reqJson = { price_for: pricingData };

            var html = TableView(reqJson, productType, fingerSize, activeDetails);
            $rightpnl.find('#detailview').html(html);

            activeDetails.find('.reqpriceJson').val(JSON.stringify(reqJson));
            var price = activeDetails.find('.prodDetail').val().split("^")[3];
            var datetime = new Date().toISOString();
            activeDetails.find('.prodDetail').val(productType + "^" + fingerSize + "^" + datetime + "^" + price);

            if ($('#<%=PriceAddon.ClientID %>').val() === "True") {
                $rightpnl.find('#getprice').trigger('click');
            }

            const modal = bootstrap.Modal.getInstance(document.getElementById('basicModal2'));
            if (modal) modal.hide();
        });

        let metalData = {};
        let allStoneData = {};
        function capitalize(str) {
            if (!str) return '';
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        }
        function validation() {
            let valid = true;

            function markInvalid($el) {
                $el.addClass('is-invalid');
                valid = false;
            }

            $('select, input').removeClass('is-invalid');
            $('.mettype').each(function () {
                const $selected = $(this).find('input[type="radio"]:checked');
                if ($selected.length === 0) markInvalid($(this).find('input[type="radio"]'));
            });

            // Validate Metal Weight
            $('.metweight').each(function () {
                const $input = $(this);
                const val = parseFloat($input.val());
                const min = parseFloat($input.attr('min'));
                const max = parseFloat($input.attr('max'));
                const $feedback = $input.siblings('.invalid-feedback');

                if (isNaN(val) || val < min || val > max) {
                    markInvalid($input);
                    $feedback.text(`Metal weight must be between ${min} and ${max}.`).show();
                } else {
                    $feedback.hide();
                }
            });

            // Validate Stone Fields
            const isStone = $('.isStone input:checked').val()?.toLowerCase();
            if (isStone === 'yes') {
                $('.stonetype').each(function () {
                    if (!$(this).val()) markInvalid($(this));
                });

                $('.clarity').each(function () {
                    if (!$(this).val()) markInvalid($(this));
                });

                $('.cuttype').each(function () {
                    if (!$(this).val()) markInvalid($(this));
                });

                $('.carat').each(function () {
                    if (!$(this).val()) markInvalid($(this));
                });

                $('.numofstone').each(function () {
                    const $input = $(this);
                    const val = parseInt($input.val());
                    const min = parseInt($input.attr('min'));
                    const max = parseInt($input.attr('max'));
                    const $feedback = $input.siblings('.invalid-feedback');

                    if (isNaN(val) || val < min || val > max) {
                        markInvalid($input);
                        $feedback.text(`Number of stones must be between ${min} and ${max}.`).show();
                    } else {
                        $feedback.hide();
                    }
                });
            }
            return valid;
        }

        function getCaratRange(row) {
            const cutType = row.find('.cuttype').val();
            const clarity = row.find('.clarity').val();
            $.ajax({
                type: "POST",
                url: "<%= ResolveUrl(PgName + "/GetcaratWeight") %>",
                data: JSON.stringify({ cutType: cutType, clarity: clarity }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (res) {
                    const $carat = row.find('.carat');
                    var r = res.d.split('|');
                    $carat.attr('min', r[0]).attr('max', r[1]);
                },
                error: function (error) {
                    console.error("Error fetching carat weight", error);
                }
            });
        }

        //================= Weight Conversion =================
        const purityHistory = new Map();


        function WeightCon($row, newPurity, oldWeight) {
            const metal = [
                { purity: '9k', factor: 12.19 },
                { purity: '10k', factor: 12.27 },
                { purity: '14k', factor: 13.88 },
                { purity: '18k', factor: 16.25 },
                { purity: '22k', factor: 17.85 },
                { purity: '950k', factor: 23.57 },
                { purity: '925k', factor: 11.04 }
            ];

            const rowKey = $row.index();

            const oldPurity = purityHistory.get(rowKey) || newPurity;

            const newPurityObj = metal.find(m => m.purity === newPurity);
            const oldPurityObj = metal.find(m => m.purity === oldPurity);

            if (!newPurityObj || !oldPurityObj) {
                //console.warn("Invalid purity:", newPurity, oldPurity);
                return oldWeight;
            }
            purityHistory.set(rowKey, newPurity);
            const newWeight = (newPurityObj.factor / oldPurityObj.factor) * oldWeight;
            return newWeight.toFixed(2);
        }

        // =================== ONLOAD ========================//
        $(document).ready(function () {
            //============= METAL DATA ===============
            $.ajax({
                type: "POST",
                url: "<%= ResolveUrl(PgName + "/GetmetalType") %>",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (res) {
                    const seen = new Set();
                    let html = '';
                    res.d.forEach(x => {
                        if (!seen.has(x.MT_Value)) {
                            seen.add(x.MT_Value);
                            html += `<label class="me-2 mt-1 radio-label">
                                                <input type="radio" name="mettype" value="${x.MT_Value}" class="form-check-input"> ${x.MT_Name}
                                            </label>`;
                        }
                    });
                    $(".mettype").html(html);
                    metalData = res.d.reduce((a, x) => {
                        a[x.MT_Value] ??= { colors: new Set(), purities: new Set() };
                        if (x.MT_Color) a[x.MT_Value].colors.add(x.MT_Color);
                        if (x.MT_Purity) a[x.MT_Value].purities.add(x.MT_Purity);
                        return a;
                    }, {});
                }
            });
            //============= STONE DATA ===============
            $.ajax({
                type: "POST",
                url: "<%= ResolveUrl(PgName + "/GetstoneType") %>",
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function (res) {
                     allStoneData = res.d;
                     const unique = new Set();
                     let options = '';

                     allStoneData.forEach(({ Stonetype }) => {
                         if (unique.has(Stonetype)) return;
                         unique.add(Stonetype);
                         const value = Stonetype === "both" ? "natural" : Stonetype.toLowerCase();
                         const label = capitalize(value);
                         const checked = value === "natural" ? "checked" : "";
                         options += `<label class="me-2 mt-1 radio-label"><input type="radio" name="stoneType" value="${value}" class="form-check-input" ${checked}>${label}</label>`;
                     });
                     $(".stoneType").html(options);
                 },
                 error: err => console.error("Failed to load stone data", err)
             });

            //============= CUTTYPE DATA =============
            $.ajax({
                type: "POST",
                url: "<%= ResolveUrl(PgName + "/GetcutType") %>",
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function (res) {
                     let options = '<option disabled="disabled" selected="selected">Select option</option>';
                     res.d.forEach(function (item) {
                         options += `<option value="${item.Cut_Value}">${item.Cut_Name}</option>`;
                     });
                     $(".cuttype").html(options);
                 },
                 error: function (error) {
                     console.error("Error fetching cut types", error);
                 }
             });
        });

        // ============ ONCHANGE =====================//
        $(document).ready(function () {
            const CVal1 = 0.0481;
            const CVal2 = 0.6846;
            const fingerSizeHistory = new Map();

            $(document).on('change', '.fingsize', function () {
                const rowKey = 0;
                const newSize = parseFloat($(this).val()) || 0;
                const $modal = $('#basicModal2');
                const goldWeight = parseFloat($modal.find('.metweight').val()) || 0;

                if (newSize === 0 || goldWeight === 0) return;
                const oldSize = fingerSizeHistory.has(rowKey)
                    ? fingerSizeHistory.get(rowKey)
                    : 7;

                const OrigWt1 = (CVal1 * oldSize) + CVal2;
                const OrigWt2 = (CVal1 * newSize) + CVal2;
                const PerChange = (OrigWt2 - OrigWt1) / OrigWt1;
                const newGoldWeight = goldWeight + (goldWeight * PerChange);

                $modal.find('.metweight').val(newGoldWeight.toFixed(2));
                fingerSizeHistory.set(rowKey, newSize);
            });


            let oldpurity = null;

            $(document).on('focusin', '.metpurity input', function () {
                oldpurity = $(this).val();
            });

            $(document).on('change', '.mettype input', function () {
                const $row = $(this).closest('.metaledit');
                const selectedType = $row.find('.mettype input:checked').val();
                if (!selectedType || !metalData[selectedType]) return;

                const metal = metalData[selectedType];
                const colors = Array.from(metal.colors);
                const purities = Array.from(metal.purities);

                const $colorSelect = $row.find('.metcolor');
                const $puritySelect = $row.find('.metpurity');

                // Generate color radios
                let colorOptions = '';
                colors.forEach((c, idx) => {
                    colorOptions += `
            <label class="me-2 mt-1 radio-label">
                <input type="radio" name="color_${selectedType}" value="${c}" class="form-check-input metal-color" ${idx === 0 ? 'checked' : ''}>
                ${c}
            </label>`;
                });
                $colorSelect.html(colorOptions);

                let purityOptions = '';
                purities.forEach((p, idx) => {
                    purityOptions += `
            <label class="me-2 mt-1 radio-label">
                <input type="radio" name="purity_${selectedType}" value="${p}" class="form-check-input metal-purity" ${idx === 0 ? 'checked' : ''}>
                ${p}
            </label>`;
                });
                $puritySelect.html(purityOptions);

                const oldpurity = $row.find('.metpurity input:checked').val();
                const oldWeight = parseFloat($row.find('.metweight').val()) || 0;
                if (oldpurity && oldWeight) {
                    const newWeight = WeightCon($row, oldpurity, oldWeight);
                    $row.find('.metweight').val(newWeight);
                }
            });

            $(document).on('change', '.metpurity input', function () {
                const $row = $(this).closest('.metaledit');
                const selectedPurity = $(this).val();
                const oldWeight = parseFloat($row.find('.metweight').val()) || 0;

                if (selectedPurity && oldWeight) {
                    const newWeight = WeightCon($row, oldpurity, oldWeight);
                    $row.find('.metweight').val(newWeight);
                }
            });

            $(document).on('change', '.isStone input', function () {
                const isStone = $(this).val().toLowerCase();

                if (isStone === 'no') {
                    $('.stonetypep, .stone-row').hide();
                } else {
                    $('.stonetypep, .stone-row').show();
                    const $checkedStoneType = $('.stoneType input[type="radio"]:checked');
                    if ($checkedStoneType.length) {
                        $checkedStoneType.trigger('change');
                    }
                }
            });

            $(document).on('change', '.stoneType input', function () {
                $('.stone-entry:gt(0)').remove();
                const $row = $('.stone-entry').first();
                const $clarity = $row.find('.clarity');
                const $carat = $row.find('.carat');

                $clarity
                    .empty()
                    .append('<option value="" selected>Select option</option>')
                    .css({ opacity: 1, 'pointer-events': 'auto' });

                const selectedStoneType = $(this).val();
                const filtered = allStoneData
                    .filter(row => row.Stonetype === selectedStoneType)
                    .map(row => ({
                        value: row.Type_Value,
                        name: row.Type_Name,
                        stontype: row.Stonetype
                    }));

                const uniqueStones = [];
                const seen = new Set();

                filtered.forEach(item => {
                    if (!seen.has(item.value)) {
                        seen.add(item.value);
                        uniqueStones.push(item);
                    }
                });

                const $select = $('.typeofStone');
                $select.empty();

                if (uniqueStones.length === 1) {
                    const item = uniqueStones[0];
                    $select
                        .append(`<option value="${item.value}" selected>${item.name}</option>`)
                        .val(item.value)
                        .trigger('change')
                        .css({
                            opacity: 0.7,
                            'pointer-events': 'none'
                        })
                    //.prop('disabled', true);
                } else {
                    $select.append('<option value="" selected>Select option</option>');
                    uniqueStones.forEach(item => {
                        $select.append(`<option value="${item.value}">${item.name}</option>`);
                    });

                    $select
                        .css({
                            opacity: 1,
                            'pointer-events': 'auto'
                        })
                    //.prop('disabled', false);
                }
            });

            $(document).on('change', '.typeofStone', function () {
                const $row = $(this).closest('.stone-entry');
                const selectedStoneTypeValue = $(this).val();
                const selectedStoneKind = $('input[name="stoneType"]:checked').val();

                const filteredClarity = allStoneData.filter(row =>
                    row.Type_Value == selectedStoneTypeValue.toLowerCase() && (row.Stonetype == selectedStoneKind)
                );

                const uniqueClarity = [];
                const seenClarity = new Set();

                filteredClarity.forEach(item => {
                    if (!seenClarity.has(item.Clarity_Value)) {
                        seenClarity.add(item.Clarity_Value);
                        uniqueClarity.push({
                            value: item.Clarity_Value,
                            name: item.Clarity_Name
                        });
                    }
                });

                const $clarity = $row.find('.clarity');

                if (uniqueClarity.length === 1) {
                    const item = uniqueClarity[0];
                    $clarity
                        .empty()
                        .append(`<option value="${item.value}" selected>${item.name}</option>`)
                        //.prop('disabled', true)
                        .css({ 'pointer-events': 'none', 'opacity': 0.7 })
                        .val(item.value)
                        .trigger('change');
                } else {
                    $clarity.empty().append('<option value="" disabled selected>Select option</option>');
                    uniqueClarity.forEach(item => {
                        $clarity.append(`<option value="${item.value}">${item.name}</option>`);
                    });
                    $clarity.prop('disabled', false).css({ 'pointer-events': '', 'opacity': '' });
                }
            });

            $(document).on('change', '.cuttype', function () {
                const cutType = $(this).val();
                const $row = $(this).closest('.stone-entry');
                getCaratRange($row);
            });
        });

        //====== STONE DATA ADD & DELETE ==========
        $(document).on('click', '.add-stone', function () {
            const $currentRow = $(this).closest('.stone-entry');
            const $newRow = $currentRow.clone();
            var isStone = $('input[name="isStone"]:checked').val();
            $newRow.find('input[type="number"]').val('1');
            if (isStone === 'lab') {
                $newRow.find('.clarity')
                    .prop('disabled', false)
                    .css({ 'pointer-events': '', 'opacity': '' })
                    .empty()
                    .append('<option value="" disabled selected>Select option</option>');
            }
            $('.stone-row').append($newRow);
        });
        $(document).on('click', '.delete-stone', function () {
            if ($('.stone-entry').length > 1) {
                $(this).closest('.stone-entry').remove();
            } else {
                alert("At least one row is required.");
            }
        });
    </script>

    <script>
        // GET PRICE
        $(document).on('click', '#getprice', function () {
            $rightpnl.find('#priceview').removeClass('d-none').html("<div class='displaytext'></div>");
            loopTypewriterEffect($rightpnl.find('#priceview .displaytext'), "Fetching Price.....");
            getprice();
        });

        function getprice() {
            var Image = activeDetails.data("image");
            var code = activeDetails.data("code");
            var ThreadID = activeDetails.data("threadid");
            var ProdType = activeDetails.data("prodtype");
            var ItmType = activeDetails.data("part");

            var reqpriceJson = activeDetails.find('.reqpriceJson').val();
            var attempt = parseInt(activeDetails.find('.prodattempt').val(), 10) || 0;
            var ProdDetail = activeDetails.find('.prodDetail').val();
            var FingerSize = ProdDetail.split("^")[1];
            const reqJson = normalizeReqJson(reqpriceJson);
            const pricing = $rightpnl.find('#priceview');
            $.ajax({
                type: "POST",
                url: "<%= ResolveUrl(PgName + "/FetchPricing") %>",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({
                    ReqJson: JSON.stringify(reqJson),
                    Attempt: attempt,
                    GCode: code,
                    ThreadID: ThreadID,
                    ProdType: ProdType,
                    FingerSize: 7,
                    Image: Image,
                    ItmType: ItmType
                }),
                success: function (res) {
                    if (!res.d.includes("Error") || !res.d.includes("error")) {
                        Displayprice(res.d, "");
                        activeDetails.find('.reqpriceJson').val(JSON.stringify(reqJson));
                        activeDetails.find('.respriceJson').val(res.d);
                        activeDetails.find('.prodattempt').val(attempt + 1);
                    } else {
                        pricing.append(res.d);
                    }
                },
                error: function (res) {
                    pricing.append("Some error occured while fetching price.");
                    console.error("Error: " + res.d);
                }
            });
        }

        //function normalizeReqJson(reqpriceJson) {
        //    let data;

        //    try {
        //        data = typeof reqpriceJson === "string"
        //            ? JSON.parse(reqpriceJson)
        //            : reqpriceJson;
        //    } catch {
        //        return { price_for: [] };
        //    }

        //    const allowedStones = [
        //        "diamond",
        //        "color stones",
        //        "ruby",
        //        "emerald",
        //        "amethyst",
        //        "blue_topaz",
        //        "topaz",
        //        "citrine",
        //        "garnet",
        //        "sapphire"
        //    ];

        //    let priceFor = [];

        //    if (Array.isArray(data?.price_for)) {
        //        priceFor = data.price_for;
        //    } else if (Array.isArray(data)) {
        //        priceFor = data;
        //    } else if (typeof data === "object") {
        //        priceFor = [data];
        //    }

        //    priceFor = priceFor.map(item => {

        //        const metal = Array.isArray(item.metal)
        //            ? item.metal.map(m => ({
        //                ...m,
        //                color: m.color?.toLowerCase() === "rose" ? "Pink" : m.color
        //            }))
        //            : [];

        //        const stones = Array.isArray(item.stones)
        //            ? item.stones.map(s => {
        //                let stoneType = (s.stone_type || "").toLowerCase();

        //                if (!allowedStones.includes(stoneType)) {
        //                    stoneType = "citrine";
        //                }

        //                return {
        //                    ...s,
        //                    stone_type: stoneType
        //                };
        //            })
        //            : [];

        //        return {
        //            metal,
        //            stones,
        //            flags: {
        //                engraving_flag: false,
        //                enamel_flag: false
        //            }
        //        };
        //    });

        //    return { price_for: priceFor };
        //}

        function normalizeReqJson(reqpriceJson) {
            let data;

            try {
                data = typeof reqpriceJson === "string"
                    ? JSON.parse(reqpriceJson)
                    : reqpriceJson;
            } catch {
                return { price_for: [] };
            }

            let priceFor = [];

            if (Array.isArray(data?.price_for)) {
                priceFor = data.price_for;
            } else if (Array.isArray(data)) {
                priceFor = data;
            } else if (typeof data === "object") {
                priceFor = [data];
            }

            priceFor = priceFor.map(item => {
                const metal = Array.isArray(item.metal)
                    ? item.metal.map(m => ({
                        ...m,
                        color: m.color?.toLowerCase() === "rose" ? "Pink" : m.color
                    }))
                    : [];

                const stones = Array.isArray(item.stones) ? item.stones : [];

                return {
                    metal,
                    stones,
                    flags: {
                        engraving_flag: false,
                        enamel_flag: false
                    }
                };
            });

            return { price_for: priceFor };
        }

        function Displayprice(resJson, Datetime) {

            const pricing = $rightpnl.find('#priceview');
            pricing.removeClass('d-none');
            pricing.empty();

            if (!resJson.startsWith('{\"current_metal_rate\":')) {
                pricing.append(requestJson);
            }
            else {

                const data = JSON.parse(resJson);

                const {
                    margin_price_SI_AA,
                    margin_price_LEFVS,
                    margin_price_mounting,
                    stones_components_LEFVS,
                    stones_components_SI_AA
                } = data;

                const natPrice = parseFloat(margin_price_SI_AA);
                const labPrice = parseFloat(margin_price_LEFVS);
                const mountPrice = parseFloat(margin_price_mounting);

                const hasError =
                    margin_price_SI_AA === "Error" ||
                    margin_price_LEFVS === "Error" ||
                    margin_price_mounting === "Error" ||
                    [natPrice, labPrice, mountPrice].some(p => isNaN(p));

                if (hasError) {
                    pricing.append(`
                <p class="text-danger">
                    Unable to generate pricing. Some details may be incorrect or incomplete.
                    Please review the entered information and reprice.
                </p>
            `);
                    return;
                }

                const leFvsArray = [].concat(stones_components_LEFVS || []);
                const siArray = [].concat(stones_components_SI_AA || []);

                const clarityLEFVS = leFvsArray.map(i => i?.clarity || 'N/A').join(', ') || 'N/A';
                const claritySI = siArray.map(i => i?.clarity || 'N/A').join(', ') || 'N/A';

                const addNotes = (stones, label) => {
                    const notes = [];
                    processStones(stones, label, notes);
                    notes.forEach(n => pricing.append(`<p class="text-alert">Note: ${n}</p>`));
                };

                if ([natPrice, labPrice, mountPrice].every(p => p === 0)) {
                    pricing.append(`<p class="text-danger">Please add markup in settings or server unavailable.</p>`);
                    return;
                }

                pricing.append(`<h3>Pricing Breakdown</h3>`);

                if (mountPrice === 0) {
                    pricing.append(`<p>Lab Stones : <strong>Cost exceeds markup settings.</strong></p>`);
                } else {
                    pricing.append(formatRange("Blank Mounting (No Stones)", mountPrice));
                    pricing.append(`<span class="note">Additional charges apply for stone setting</span>`);
                }

                const f = d =>
                    `${String(d.getMonth() + 1).padStart(2, '0')}/` +
                    `${String(d.getDate()).padStart(2, '0')}/` +
                    `${d.getFullYear()}`;

                const base = Datetime ? new Date(Datetime) : new Date();

                let labFrom = new Date(base);
                labFrom.setDate(labFrom.getDate() + 15);

                let labTo = new Date(base);
                labTo.setDate(labTo.getDate() + 20);

                let labRange = `${f(labFrom)} - ${f(labTo)}`;

                let natFrom = new Date(base);
                natFrom.setDate(natFrom.getDate() + 28);

                let natTo = new Date(base);
                natTo.setDate(natTo.getDate() + 35);

                let natRange = `${f(natFrom)} - ${f(natTo)}`;

                if (natPrice !== labPrice || labPrice !== mountPrice) {

                    if (natPrice === 0) {
                        pricing.append(`<p>Natural Stones : <strong>Cost exceeds markup settings.</strong></p>`);
                    } else {
                        pricing.append(formatRange("All Natural Stones", natPrice));
                        pricing.append(`<span class="note">Expected delivery: ${natRange}</span>`);
                        addNotes(stones_components_SI_AA, "Natural");
                    }

                    if (labPrice === 0) {
                        pricing.append(`<p>Lab Stones : <strong>Cost exceeds markup settings.</strong></p>`);
                    } else {
                        pricing.append(formatRange("All Lab Stones", labPrice));
                        pricing.append(`<span class="note">Expected delivery: ${labRange}</span>`);
                        addNotes(stones_components_LEFVS, "Lab");
                    }
                }
            }

            pricing.append("<div class='gendate'></div>");

            if (Datetime === "") {
                pricing.find('.gendate')
                    .html('Generated on: ' + new Date().toLocaleString("en-US"));
            }
            else {
                pricing.find('.gendate')
                    .html('Generated on: ' + Datetime);
            }
        }

        function processStones(stoneData, type, noteArray) {
            if (!stoneData) return;

            const stones = Array.isArray(stoneData) ? stoneData : [stoneData];

            stones.forEach(stone => {
                if (stone.status === "Not included") {
                    let label = type;
                    if (type === "Lab") {
                        if (stone.clarity === "LEFVS") label = "Lab Diamond";
                        else if (stone.clarity === "Lab_Color") label = "Colored Stone";
                    } else if (type === "Natural") {
                        label = "Natural Diamond";
                    }

                    noteArray.push(`${stone.size} ${stone.cut_type} ${label} is not included in pricing`);
                }
            });
        }
        function formatRange(label, price) {
            if (!price) return '';
            const lower = price.toFixed(2);
            const upper = (price * 1.10).toFixed(2);
            const className = label.toLowerCase().replace(/\s+/g, '-');

            return `<p class="${className}">${label}: <strong>$${lower} – $${upper}</strong></p>`;
        }
    </script>

    <script>
        $(document).ready(function () {
            var ThreadID = $('#<%= ThreadID.ClientID %>').val() || "";
            if (ThreadID == "") {
            } else {
                threaddetails(ThreadID);
            }
        });

        $(document).on('click', '.thread-link', function () {
            var threadid = $(this).data("threadid");
            threaddetails(threadid);
            activeDetails = null;
            $rightpnl.find('#detailview, #priceview').empty();
            $rightpnl.find("#price-skeleton-view").removeClass('d-none');
            $rightpnl.find("#generate-details-container").addClass('d-none');
        });

        function threaddetails(ThreadID) {
            $main.siblings('#start-view').hide();
            $main.html("<div class='looptemp'></div>");
            loopTypewriterEffect($main.find('.looptemp'), "Processing your chat history");
            $.ajax({
                type: "POST",
                url: "<%= ResolveUrl(PgName + "/ThreadDetails") %>",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({ ThreadID }),
                success: function (res) {
                    const data = res.d;
                    if (!data.html.includes("Sorry")) {
                        attemptCount++;
                        $main.siblings('#start-view').remove();
                        $('#<%= ThreadID.ClientID %>').val(ThreadID);
                        $('#<%= GenImage1.ClientID %>').val(data.GenImage1);
                        $('#<%= GenImage2.ClientID %>').val(data.GenImage2);
                        $('#Submitbtn').attr("onclick", "Submit(" + (data.Attempt + 1) + ", '" + ThreadID + "')");
                    } else {
                        $main.siblings('#start-view').show();
                    }

                    $main.html(data.html);
                    $main.last().find('#viewbreakdown').trigger('click');
                    initLightbox();
                    applyReadMore();
                },
                error: function (res) {
                    $main.html(res.d);
                    console.error("Error: " + res.d);
                }
            });
        }
    </script>

    <script>
        $(document).on('click', '.updateBtn', function () {
            const btn = $(this);
            const icon = btn.find('i');
            const Action = btn.data('action');

            const container = btn.closest('.resultdetails');
            var ThreadID = container.data('threadid');
            var Code = container.data('code');
            var Image = "";

            if (Action == "copyText") {
                const btn = $(this);
                const text = btn.closest('.aistusec').find('p').text().trim();

                navigator.clipboard.writeText(text).then(() => {
                    const icon = btn.find('i');
                    const oldClass = icon.attr('class');

                    icon.removeClass().addClass('fa-solid fa-check text-success');

                    setTimeout(() => {
                        icon.removeClass().addClass(oldClass);
                    }, 3000);
                });
                return;
            }

            if (Action === "Download3") {
                Image = btn.siblings("img").attr("src");
                ThreadID = "testing";
                Code = 1234567;
            } else {
                Image = container.data("image");
            }

            if (!Image) return;

            const originalClass = icon.attr('class');
            icon.data('oldclass', originalClass);
            icon.removeClass().addClass('fa-solid fa-spinner fa-spin');

            $.ajax({
                url: '<%= ResolveUrl(PgName + "/ActionData") %>',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ Action, ThreadID, Code, Image }),
                success: function (res) {
                    icon.attr('class', icon.data('oldclass'));
                    toggleIcon(Action, container, res.d, Image);
                },
                error: function () {
                    icon.attr('class', icon.data('oldclass'));
                }
            });
        });

        function toggleIcon(action, container, status, Image) {
            const bar = container.find('.image-actions');

            if (action.includes('Fav1') || action.includes('Fav2'))
                bar.find('.favourbtn i').toggleClass('fa-regular fa-solid');

            if (action.includes('Like1') || action.includes('Like2')) {
                bar.find('.likebtn i').addClass('fa-solid').removeClass('fa-regular');
                bar.find('.dislikebtn i').addClass('fa-regular').removeClass('fa-solid');
            }

            if (action.includes('Dislike1') || action.includes('Dislike2')) {
                bar.find('.dislikebtn i').addClass('fa-solid').removeClass('fa-regular');
                bar.find('.likebtn i').addClass('fa-regular').removeClass('fa-solid');
            }

            if (action.includes('Download1') || action.includes('Download2') || action.includes('Download3')) {
                const link = document.createElement('a');
                link.href = 'data:image/png;base64,' + status;
                link.download = container.data('image');
                if (action.includes('Download3')) {
                    link.download = Image.split('/').pop();
                }
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

            if (action.includes('Refresh1') || action.includes('Refresh2')) {
                if (status && status.endsWith('.webp')) {
                    const imgUrl = 'https://aidev1.cloudwebsitesolutions.com/img/gemart/medium/' + status;
                    container.find('img').attr('src', imgUrl);
                    container.find('a.preview-link').attr('href', imgUrl);
                }
            }
        }

        let activeLightbox = null;

        function initLightbox() {
            const lb = GLightbox({ selector: '.gallery-lightbox' });
            lb.on('open', function () { activeLightbox = lb; });
            lb.on('close', () => {
                activeLightbox = null;
            });
        }
        $(document).ready(function () {
            initLightbox();
        });
    </script>

    <script>
        $(document).on('click', '#viewVariations', function () {
            const $mainDiv = $(this).closest('.singleholder');
            const $variant = $mainDiv.find('.variantsec');
            const $scrollArea = $mainDiv.closest('#chat-scroll-area');
            $variant.toggleClass('d-none d-flex');
            setTimeout(function () {
                if ($scrollArea.length) {
                    $scrollArea.scrollTop($scrollArea.scrollTop() + 250);
                }
            }, 50);
        });

        $(document).on('click', '#generateVariant', function () {
            const $btn = $(this);
            const $icon = $btn.find('i');
            const Parentdiv = $btn.closest('.singleholder');
            const container = Parentdiv.find('.resultdetails');

            $icon.removeClass('fa-plus').addClass('fa-spinner fa-spin');

            let Image = container.data("image") || "";
            if (!Image) {
                Image = $("#<%= GenImage1.ClientID %>").val() || "";
            }
            const CustID = $("#<%= CustIDs.ClientID %>").val() || 0;

            $.ajax({
                url: '<%=ResolveUrl(PgName + "/GenerateVariant")%>',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    Code: parseInt(container.data("code")) || 0,
                    ThreadID: container.data("threadid") || "",
                    itmType: container.data("part") || "",
                    Image: Image,
                    CustID: CustID
                }),
                success: function (res) {
                    if (res.d && res.d.html) {

                        Parentdiv.find('.variantsec').remove();
                        Parentdiv.find('.resultdetails').after(res.d.html);

                        if (res.d.images) {
                            container.attr('data-images', res.d.images);
                        }

                        if (res.d.text) {
                            container.attr('data-text', res.d.text);
                        }
                        initLightbox();
                    }
                },
                error: function (xhr) {
                    console.error('generateVariant error:', xhr);
                    ErrorPopup(1);
                },
                complete: function () {
                    $icon.removeClass('fa-spinner fa-spin').addClass('fa-plus');
                }
            });
        });
    </script>

    <uc2:gemartmenuscript runat="server" ID="gemartmenuscript" />
</asp:Content>
