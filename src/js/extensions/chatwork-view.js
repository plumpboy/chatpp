function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o, r, i, a, s, c, l = n(11), u = n(25), p = n(16), d = n(7), f = n(90), h = n(315), m = n(1177), _ = n(316), g = n(2), y = n(233), v = n(1178), b = n(360), w = n(359), x = n(133), k = function() {
        function e(e) {
            this.model = e,
            this.resize_delay_timer = null,
            this.key = {},
            this.keyfunc = {},
            this.ip_error_alerted = !1,
            this.unloading = !1,
            this.user_guide_dialog = null,
            this.announce_dialog = null,
            this.storage_limit_dialog = null,
            this.feedback_complete_dialog = null,
            this.limit_error_dialog = null,
            this.join_live_tip = null,
            this.iframe_loaded = !1,
            this.iframe_func_list = [],
            this.dialog_id = 0,
            this.progress_dialog = null,
            this.post_load_func_list = [],
            this.post_loaded = !1,
            this.notify = null,
            this.cur_href = "",
            this.avatar_class_map = {
                huge: "avatarHuge",
                large: "avatarLarge",
                medium: "avatarMedium",
                small: "avatarSmall",
                tiny: "avatarTiny"
            },
            this.is_end_init_loaded = !1,
            this.end_init_func_list = [],
            this.$window = $(window),
            this.previewlink_dialog = null,
            this.preview_req = null,
            this.announce_infomation_dat = {},
            o = $("#_globalHeader").outerHeight(!0),
            r = parseInt($("#_content").css("margin-top"), 10),
            i = $C("#_mainContent").outerHeight(!0) - $C("#_mainContent").innerHeight(),
            $C("#_sideContent").outerHeight(!0) - $C("#_sideContent").innerHeight(),
            a = $("#_sideContentMenu__header").outerHeight(!0),
            s = parseInt($("#_subContentArea").css("padding-top"), 10),
            c = $("#_chatRoomDescriptionNav").outerHeight(!0)
        }
        return e.prototype.prepare = function() {
            var e = this;
            e.prepareHiddenIframe(),
            $C("#_wrapper").on("mouseenter", "._showDescription", function() {
                if (!$.cwMessageTip.isInit(this)) {
                    var e = $(this)
                      , t = {
                        message: function() {
                            return e.hasClass("_showDescription") ? e.attr("aria-label") : ""
                        }
                    }
                      , n = e.attr("data-delay");
                    t.delay = null != n ? parseInt(n, 10) : d.TM.messagetip_delay,
                    e.cwMessageTip(t).open()
                }
            }).on("mouseenter", "._externalMark", function() {
                if (!$.cwMessageTip.isInit(this)) {
                    var e = $(this)
                      , t = {
                        message: g.Language.getLang("%%%chatroom_not_only_internal%%%"),
                        offsetLeft: d.TM.extermal_marktip_offset_left
                    };
                    e.cwMessageTip(t).open()
                }
            }).on("mouseenter", "._pin", function() {
                if (!$.cwMessageTip.isInit(this)) {
                    var e = $(this)
                      , t = {
                        message: g.Language.getLang("%%%pin_hint%%%"),
                        delayQuickMode: !1,
                        delay: d.TM.messagetip_delay
                    };
                    e.cwMessageTip(t).open()
                }
            }).on("click", "._joinLive", function() {
                e.join_live_tip || e.prepareLive(),
                e.join_live_tip.open($(this))
            }).on("click", "._profileTipCheckLabel", function() {
                $(this).closest("._contactPanel").find("._cwCB").click()
            }),
            $C("body").on("click", "._previewLink", function() {
                var t = $(this);
                return e.openPreviewLinkDialog(t.attr("data-type"), u.urldecode(t.attr("data-url")), t.attr("data-user-id"), t.attr("data-content-id")),
                !1
            }).on("keypress", "form input[type=text]", function(e) {
                if (13 == e.keyCode)
                    return !1
            }),
            $("#_openInformation").click(function() {
                e.openInformationPanel()
            }),
            $("#_openPlatformMenu").click(function() {
                e.openPlatformMenuPanel()
            }),
            $("#_feedback").click(function() {
                d.CW.application.getACL().openFeedback(),
                $.cwFloatBox.close($C("#_informationBox"))
            }),
            $("#_cheatSheetLink").click(function() {
                d.CHEATSHEET.view.open(),
                $.cwFloatBox.close($C("#_informationBox"))
            }),
            (d.canPlayOgg || d.canPlayMp3) && (e.embedAudio("BG_call"),
            $("#_audio_BG_call").attr("loop", "true").on("play", function() {
                $(this).data("playTimeout", setTimeout(function() {
                    d.CW.stopSound("BG_call")
                }, 3e5))
            }).on("ended", function() {
                clearTimeout($(this).data("playTimeout"))
            })),
            $C("body").on("offline", function() {
                d.CW && d.CW.setConnectionError()
            }).on("change", "._cwValidateFileImage", function() {
                var e = $.cwValidate.File.hasError(this, {
                    maxsize: 5242880,
                    onlyimage: !0
                });
                if (e) {
                    var t = e.join("\n");
                    d.CW.alert(t)
                }
            }),
            $(window).on("beforeunload", function() {
                e.unloading = !0,
                setTimeout(function() {
                    e.unloading = !1
                }, 3e3)
            }),
            b.onResizeWindow("ChatWorkView", function() {
                e.model.resizeLayout()
            });
            var t = !0
              , n = null;
            $C("document").on("focus", "input,textarea", function() {
                t = !1,
                n = $(this)
            }).on("blur", "input,textarea", function() {
                t = !0,
                n = null
            }).keydown(function(o) {
                e.key.ctrl = void 0 === o.modifiers ? o.ctrlKey : o.modifiers & Event.CONTROL_MASK,
                e.key.shift = void 0 === o.modifiers ? o.shiftKey : o.modifiers & Event.SHIFT_MASK,
                e.key.alt = void 0 === o.modifiers ? o.altKey : o.modifiers & Event.ALT_MASK,
                e.key.command = void 0 === o.modifiers ? o.metaKey : o.modifiers & Event.META_MASK;
                var r = o.target;
                if (r && r instanceof Element && !["input", "textarea"].includes(r.tagName.toLowerCase())) {
                    if (t ? n && 0 != n.offset().top && (t = !1) : n && 0 == n.offset().top && (t = !0),
                    t && !$.cwDialog.isShown() && !$.cwFloatWindow.isShown()) {
                        var i = e.getKeyCombinationMap(o.keyCode, e.key.ctrl, e.key.shift, e.key.alt, e.key.command);
                        if (null != e.keyfunc[i])
                            return $C("#_wrapper").click(),
                            e.keyfunc[i](),
                            !1
                    }
                    return 27 != o.keyCode && void 0
                }
            }).keyup(function(t) {
                e.key.ctrl = void 0 === t.modifiers ? t.ctrlKey : t.modifiers & Event.CONTROL_MASK,
                e.key.shift = void 0 === t.modifiers ? t.shiftKey : t.modifiers & Event.SHIFT_MASK,
                e.key.alt = void 0 === t.modifiers ? t.altKey : t.modifiers & Event.ALT_MASK,
                e.key.command = void 0 === t.modifiers ? t.metaKey : t.modifiers & Event.META_MASK
            }),
            $(window).blur(function() {
                e.key.ctrl = !1,
                e.key.shift = !1,
                e.key.alt = !1,
                e.key.command = !1
            }),
            $("#_openServiceAdmin").click(function() {
                e.showServiceAdmin()
            }),
            $("#_openServiceAdminUpgrade").click(function() {
                e.showServiceAdmin("upgrade")
            }),
            $("#_storageLimitLink").click(function() {
                e.storage_limit_dialog.close(),
                "free" == e.model.plan ? e.showServiceAdmin("upgrade") : e.showOptionPlanPrice()
            }),
            e.onEndInitLoad(function() {
                e.resizeLayout(),
                $("#_loader").fadeOut("slow"),
                $("#_wrapper").css({
                    visibility: "visible"
                })
            })
        }
        ,
        e.prototype.openJoinLiveTipForOldCode = function(e) {
            this.join_live_tip || this.prepareLive(),
            this.join_live_tip.open($(e))
        }
        ,
        e.prototype.prepareLive = function() {
            var e = this;
            e.join_live_tip = $("#_joinLiveTip").cwToolTip({
                open: function(e) {
                    this.data.live_id = e.attr("data-live-id"),
                    this.data.account_id = e.attr("data-aid")
                }
            });
            var t = function(t) {
                var n;
                e.join_live_tip.data.live_id ? n = d.CW.getLiveUrlById(e.join_live_tip.data.live_id, t) : e.join_live_tip.data.account_id && (n = d.CW.getLiveUrl(d.AC.getRoomId(e.join_live_tip.data.account_id), [d.AC.myid, e.join_live_tip.data.account_id], t)),
                window.open(n, "cwlive", "menubar=0,toolbar=0,titlebar=0,status=0,scrollbars=0,resizable=1"),
                e.join_live_tip.close()
            };
            e.join_live_tip.$el.on("click", "._joinLiveByVideo", function() {
                t("video")
            }).on("click", "._joinLiveByVoice", function() {
                t("voice")
            })
        }
        ,
        e.prototype.prepareHiddenIframe = function() {
            for (var e = this, t = [{
                id: "_downloadFrame",
                name: "_downloadFrame"
            }], n = "", o = 0, r = t.length; o < r; o++) {
                var i = t[o];
                n += '<iframe id="' + i.id + '" name="' + i.name + '" src="" style="display: none"></iframe>'
            }
            setTimeout(function() {
                $("#_hiddenIframe").html(n);
                for (var t = 0, o = e.iframe_func_list.length; t < o; t++)
                    e.iframe_func_list[t]();
                e.iframe_func_list = [],
                e.iframe_loaded = !0
            }, 3e3),
            $("#_liveNotificationClose").click(e.closeLiveNotification),
            $C("#_liveNotificationLiveButton").click(function() {
                d.CW.stopSound("BG_call")
            })
        }
        ,
        e.prototype.openLiveNotification = function(e, t) {
            var n = d.RL.rooms[t]
              , o = n.getAccountId()
              , r = "";
            r = o ? g.Language.getLang("%%%live_call_direct%%%", {
                name: d.AC.getName(o)
            }) : g.Language.getLang("%%%live_call_chat%%%", {
                name: d.AC.getName(o),
                chat_name: n.getName()
            }),
            $C("#_liveNotificationMessage").text(r),
            $C("#_liveNotification").slideDown(),
            $C("#_liveNotificationLiveButton").attr("data-live-id", e),
            d.CW.playSound("BG_call")
        }
        ,
        e.prototype.closeLiveNotification = function() {
            $C("#_liveNotification").slideUp(),
            d.CW.stopSound("BG_call")
        }
        ,
        e.prototype.onIframeReady = function(e) {
            this.iframe_loaded ? e() : this.iframe_func_list.push(e)
        }
        ,
        e.prototype.alert = function(e, t, n) {
            var o, r = "_alertDialogBody" + this.dialog_id, i = $('<div id="_alertDialog' + this.dialog_id + '" class="dialog dialogPadding"><pre id="' + r + '" class="alertDialogBody"></pre></div>');
            $C("body").append(i),
            n ? o = f.mlength($("#" + r).html(e).text()) : ($("#" + r).text(e),
            o = f.mlength(e));
            var a = 400;
            o > 50 && (a = 500),
            i.cwDialog({
                width: a,
                minHeight: 100,
                height: "auto",
                autoOpen: !0,
                buttonLabels: [g.Language.getLang("%%%button_ok%%%")],
                buttonSubmit: 0,
                buttonClick: function(e) {
                    switch (e) {
                    case 0:
                        "function" == typeof t && t(),
                        this.close()
                    }
                },
                close: function() {
                    i.remove()
                }
            }),
            this.dialog_id++
        }
        ,
        e.prototype.set_confirm_dialog = function(e) {
            var t, n = "_confirmDialogBody" + this.dialog_id, o = $('<div id="_confirmDialog' + this.dialog_id + '" class="dialog dialogPadding">\n          <pre id="' + n + '" class="confirmDialogBody"></pre></div>');
            $C("body").append(o),
            e.is_html ? t = f.mlength($("#" + n).html(e.msg).text()) : ($("#" + n).text(e.msg),
            t = f.mlength(e.msg));
            var r = t > 50 ? 500 : 400;
            o.cwDialog({
                width: r,
                minHeight: 100,
                height: "auto",
                autoOpen: !0,
                buttonLabels: [e.cancel_button_label || g.Language.getLang("%%%button_cancel%%%"), e.primary_button_label || g.Language.getLang("%%%button_ok%%%")],
                buttonSubmit: 1,
                buttonClick: function(t) {
                    switch (t) {
                    case 0:
                        "function" == typeof e.cancel_callback && e.cancel_callback(),
                        this.close();
                        break;
                    case 1:
                        e.ok_callback(),
                        this.close()
                    }
                },
                close: function() {
                    o.remove()
                }
            }),
            this.dialog_id++
        }
        ,
        e.prototype.confirm = function(e) {
            this.set_confirm_dialog({
                msg: e.msg,
                ok_callback: e.ok_callback,
                cancel_callback: e.cancel_callback,
                is_html: e.is_html,
                primary_button_label: e.primary_button_label,
                cancel_button_label: e.cancel_button_label
            })
        }
        ,
        e.prototype.confirmDelete = function(e, t, n, o, r) {
            var i = "_confirmDialogBody" + this.dialog_id
              , a = $('<div id="_confirmDialog' + this.dialog_id + '" class="confirmDeleteDialog"><div id="' + i + '" class="confirmDeleteDialog__body"></div></div>');
            $C("body").append(a);
            var s = $("#" + i)
              , c = f.mlength(e);
            o ? c = f.mlength(s.html(e).text()) : s.text(e).wrapInner('<pre class="confirmDeleteDialog__text"></pre>'),
            r || (r = g.Language.getLang("%%%button_delete%%%"));
            var l = 300;
            c > 50 && (l = 500),
            a.cwDialog({
                width: l,
                minHeight: 100,
                height: "auto",
                autoOpen: !0,
                buttonLabels: [g.Language.getLang("%%%button_cancel%%%"), r],
                buttonDelete: 1,
                buttonClick: function(e) {
                    switch (e) {
                    case 0:
                        "function" == typeof n && n(),
                        this.close();
                        break;
                    case 1:
                        this.isAgreed() && (t(),
                        this.close())
                    }
                },
                close: function() {
                    a.remove()
                }
            }),
            this.dialog_id++
        }
        ,
        e.prototype.showProgress = function(e) {
            $("#_progressDialogBody").html('\n            <div style="padding:10px"\n                 class="contentLoading"\n            >\n              <img src="' + p.CF_ASSETS_PATH + '/images/loader/img_loader_gray.gif"\n                   alt="Loading"\n              >' + e + "\n            </div>\n        "),
            this.progress_dialog = $("#_progressDialog").cwDialog({
                autoOpen: !0,
                closeOnEscape: !1
            })
        }
        ,
        e.prototype.hideProgress = function() {
            this.progress_dialog && (this.progress_dialog.close(),
            this.progress_dialog = null)
        }
        ,
        e.prototype.registerKeyboardShortcut = function(e, t, n, o, r, i) {
            return this.keyfunc[this.getKeyCombinationMap(e, t, n, o, r)] = i,
            this
        }
        ,
        e.prototype.getKeyCombinationMap = function(e, t, n, o, r) {
            var i = "";
            return i += t ? "1" : "0",
            i += n ? "1" : "0",
            i += o ? "1" : "0",
            i += r ? "1" : "0",
            i += e
        }
        ,
        e.prototype.onPostLoad = function(e) {
            this.post_loaded ? e() : this.post_load_func_list.push(e)
        }
        ,
        e.prototype.isDesktopVersionForPromptingAppInstallation = function() {
            var e = window.navigator.userAgent;
            return -1 !== e.indexOf("Shinanogawa ChatWork Desktop/2.4.4") || -1 !== e.indexOf("Shinanogawa Chatwork Desktop/2.5.0")
        }
        ,
        e.prototype.postLoad = function() {
            var e = this;
            1 == d.CW.security_dat.disable_external && $("#_addContactType").remove(),
            1 == e.model.security_dat.disable_send_file && $("#_file").remove(),
            1 == e.model.security_dat.disable_download_file && ($("#_chatFileAll").remove(),
            $("#_openFileWindow").remove()),
            1 == d.CW.security_dat.disable_social_profile && $("#_profileSnsListEdit").hide(),
            x.urlParam.matchType({
                biwa_commit_hash: function() {},
                preview: function() {},
                contact_myrequest: function() {
                    d.AC.view.openContactWindow(),
                    $("#_contactWindowTabMyRequest").click()
                },
                contact_request: function() {
                    d.AC.view.openContactWindow(),
                    $("#_contactWindowTabRequest").click()
                },
                join: function(e) {
                    d.RL.joinPublicChat(e)
                },
                tutorial: function() {
                    d.ST.data.userguide_welcome = 0,
                    d.ST.view.initializeStepGuide()
                },
                contact: function(e) {
                    var t = !1;
                    if (e == d.AC.getChatWorkId(d.AC.myid))
                        d.CW.alert(g.Language.getLang("%%%contact_cwid_error_myself%%%")),
                        t = !0;
                    else
                        for (var n in d.AC.contact_list) {
                            var o = d.AC.contact_list[n];
                            if (e == d.AC.getChatWorkId(o)) {
                                d.CW.alert(g.Language.getLang("%%%contact_cwid_error_already%%%", {
                                    chatwork_id: e
                                })),
                                t = !0;
                                break
                            }
                        }
                    if (!t) {
                        var r = {
                            body_params: {},
                            query_params: {
                                cwid: e
                            }
                        };
                        d.CW.post("get_account_info_by_cwid", r, function(t) {
                            t.account_dat ? (d.CW.application.getACL().updateUserParam(t.account_dat.aid, t.account_dat),
                            d.AC.setAccountDat(t.account_dat.aid, t.account_dat),
                            d.AC.showChatWorkIdRequestDialog(t.account_dat)) : d.CW.alert(g.Language.getLang("%%%contact_cwid_error_noexist%%%", {
                                chatwork_id: e
                            }))
                        }, function(e) {
                            d.CW.alert(e)
                        })
                    }
                },
                open_contact: function() {
                    d.AC.view.openContactWindow()
                },
                mytask: function() {
                    d.TK.view.openTaskWindow()
                },
                chat_setting: function() {
                    d.ST.view.openSettingDialog()
                },
                profile_setting: function() {
                    d.AC.view.openProfileWindow(d.AC.myid)
                },
                service_admin: function() {
                    e.showServiceAdmin()
                },
                information: function() {
                    e.openInformationPanel()
                }
            });
            for (var t = 0, n = e.post_load_func_list.length; t < n; t++)
                e.post_load_func_list[t]();
            if (e.isDesktopVersionForPromptingAppInstallation() && "ja" === LANGUAGE) {
                var o = l.create("desktopappInstallationDialog")
                  , r = $('\n        <div id="_desktopAppInstallationDialog"  class=' + o() + ">\n          <div class=" + o("body") + ">\n            <div class=" + o("title") + '>\n              <svg viewBox="0 0 10 10"\n                         class  =' + o("infoIcon") + '\n                         width  ="16"\n                         height ="16"\n                    >\n                      <use fill-rule ="evenodd"\n                           xlink:href="#icon_info"\n                      ></use>\n              </svg>\n              最新のデスクトップ版アプリをインストールしてください\n            </div>\n            <p class=' + o("text") + ">お客様がご利用のバージョンにて「最新版に自動更新されない問題」が発生しています。 インストール手順を確認のうえ、最新のデスクトップ版アプリをインストールしてください。</p>\n          </div>\n        </div>\n      ");
                $C("body").append(r),
                r.cwDialog({
                    width: 600,
                    height: "auto",
                    minHeight: 100,
                    autoOpen: !0,
                    buttonLabels: [g.Language.getLang("%%%button_close%%%"), "インストール手順を確認する"],
                    buttonSubmit: 1,
                    buttonClick: function(e) {
                        switch (e) {
                        case 0:
                            this.close();
                            break;
                        case 1:
                            window.open("https://help.chatwork.com/hc/ja/articles/360000321262", "_blank")
                        }
                    },
                    close: function() {
                        r.remove()
                    }
                })
            }
            $(window).scrollTop(0),
            e.post_loaded = !0
        }
        ,
        e.prototype.popup = function(e, t, n, o) {
            this.notify && ("function" == typeof this.notify.cancel ? this.notify.cancel() : "function" == typeof this.notify.close && this.notify.close()),
            this.notify = y.NotificationAPI.createNotification(e, t, n),
            this.notify.room_id = o,
            this.notify.onclick = function() {
                window.focus(),
                d.RL.selectRoom(this.room_id),
                d.CW.application.render(),
                this.cancel()
            }
            ,
            this.notify.show()
        }
        ,
        e.prototype.embedAudio = function(e) {
            var t, n, o = "_audio_" + e;
            d.canPlayOgg ? t = e + ".ogg" : d.canPlayMp3 && (t = e + ".mp3"),
            n = '<audio id="' + o + '"><source src="./sound/' + t + '"/></audio>',
            $C("#_audioList").append(n)
        }
        ,
        e.prototype.playSound = function(e, t) {
            var n, o = "_audio_" + e, r = $("#" + o);
            r.length || (this.embedAudio(e),
            r = $("#" + o)),
            null == t && (t = d.ST.data.sound_volume),
            (n = r[0]).volume = t,
            n.load(),
            n.play()
        }
        ,
        e.prototype.stopSound = function(e) {
            document.getElementById("_audio_" + e).pause()
        }
        ,
        e.prototype.changeFavicon = function(e) {
            this.cur_href != e && (this.cur_href = e,
            $("#_favicon").remove(),
            $("head").append($('<link rel="shortcut icon" id="_favicon" href="' + e + '?1"  type="image/vnd.microsoft.icon" />')))
        }
        ,
        e.prototype.alertUpdated = function() {
            d.CW.alert(g.Language.getLang("%%%chatwork_update%%%"))
        }
        ,
        e.prototype.showUpdated = function() {
            $("#cw_version_update").html('<a href="./">' + g.Language.getLang("%%%chatwork_do_update%%%") + "</a>").show()
        }
        ,
        e.prototype.setOnline = function() {
            $("#_statusAlert").fadeOut()
        }
        ,
        e.prototype.setConnectionError = function(e) {
            "NO LOGIN" == e || "NO TOKEN" == e || "IP ERROR" == e ? (this.unloading || ($("#_statusAlertMessage").html('<a href="./">' + g.Language.getLang("%%%connection_error_logout%%%") + "</a>"),
            $("#_statusAlert").fadeIn()),
            "IP ERROR" == e && (this.ip_error_alerted || this.model.alert(g.Language.getLang("%%%error_cant_login_ip%%%")),
            this.ip_error_alerted = !0)) : "INVALID USER" == e ? this.unloading || ($("#_statusAlertMessage").html('<a href="./">' + g.Language.getLang("%%%connection_error_invalid_user%%%") + "</a>"),
            $("#_statusAlert").fadeIn()) : "INVALID TOKEN" == e ? this.unloading || null === d.RM || (this.setDrafts(),
            location.reload()) : this.unloading || ($("#_statusAlertMessage").html('<a href="./">' + g.Language.getLang("%%%connection_error_offline%%%") + "</a>"),
            $("#_statusAlert").fadeIn())
        }
        ,
        e.prototype.renderMessage = function(e, t) {
            var n = $.extend({
                disable_download_file: d.CW.security_dat.disable_download_file,
                display_trim_link: d.ST.data.shorten_url,
                mid: void 0,
                text: !1
            }, t);
            return n.text ? m.renderAstToText(e) : h.renderAstToHtml(e, n)
        }
        ,
        e.prototype.registerAvatar = function() {}
        ,
        e.prototype.getAvatarClass = function(e) {
            return this.avatar_class_map[e]
        }
        ,
        e.prototype.getAvatarPanel = function(e, t) {
            var n = CF_PATH + "/avatar/" + d.AC.getAvatarId(e)
              , o = "";
            return t.src ? n : (t.hovertip && (o += " _avatarHoverTip"),
            t.clicktip && (o += " _avatarClickTip avatarClickTip"),
            t.size && (o += " " + this.getAvatarClass(t.size)),
            '<img class="' + o + " _avatar _avatarAid" + e + '" data-aid="' + e + '" src="' + n + '">')
        }
        ,
        e.prototype.getMessageBadgeAvatarPanel = function(e, t) {
            var n = CF_PATH + "/avatar/" + d.AC.getAvatarId(e)
              , o = "";
            return t.src ? n : (t.hovertip && (o += " _avatarHoverTip"),
            t.clicktip && (o += " _avatarClickTip"),
            '<img class="messageBadge__avatar ' + o + " _avatarAid" + e + '" data-aid="' + e + '" src="' + n + '">')
        }
        ,
        e.prototype.getCoverPanel = function(e, t) {
            var n = CF_PATH + "/cover/" + d.AC.getCoverId(e)
              , o = "";
            return t.src ? n : (t.extraclass && (o += " " + t.extraclass),
            '<img class="' + o + " _coverImage _coverAid" + e + ' coverImage" data-aid="' + e + '" src="' + n + '">')
        }
        ,
        e.prototype.getName = function(e) {
            return '<span class="_nameAid' + e + '">' + u.escape_html(d.AC.getName(e)) + "</span>"
        }
        ,
        e.prototype.getOrgName = function(e) {
            return '<span class="cw_onm' + e + '">' + u.escape_html(d.AC.getOrgName(e)) + "</span>"
        }
        ,
        e.prototype.getDepartment = function(e) {
            return '<span class="cw_dept' + e + '">' + u.escape_html(d.AC.getDepartment(e)) + "</span>"
        }
        ,
        e.prototype.getOrgTitle = function(e) {
            return this.getOrgName(e) + " " + this.getDepartment(e)
        }
        ,
        e.prototype.getFullName = function(e) {
            return '<span class="cw_fnm' + e + '">' + u.escape_html(d.AC.getFullName(e)) + "</span>"
        }
        ,
        e.prototype.getChatWorkId = function(e) {
            return d.AC.getChatWorkId(e) ? '<span class="cw_cwid' + e + '">' + u.escape_html(d.AC.getChatWorkId(e)) + "</span>" : ""
        }
        ,
        e.prototype.getChatWorkIdLink = function(e) {
            var t = d.AC.getChatWorkId(e);
            return t ? '<a href="' + CHATWORK_MYPAGE_PATH + "/" + t + '" rel="noopener noreferrer" target="_blank">' + this.getChatWorkId(e) + "</a>" : ""
        }
        ,
        e.prototype.getFilePanel = function(e, t) {
            return d.FL.view.getFilePanel(e, t)
        }
        ,
        e.prototype.getTaskPanel = function(e, t) {
            return d.TK.view.getTaskPanel(e, t)
        }
        ,
        e.prototype.showLimitErrorDialog = function(e, t) {
            this.limit_error_dialog || (this.limit_error_dialog = $("#_limitErrorDialog").cwDialog({
                width: 550,
                open: function(e) {
                    $C("#_upgradeMessage").html(e)
                }
            })),
            this.limit_error_dialog.setOption({
                title: e
            }).open(t)
        }
        ,
        e.prototype.showContactLimitErrorDialog = function(e) {
            var t = g.Language.getLang("%%%contact_error_cantadd%%%")
              , n = g.Language.getLang("%%%contact_error_planlimit%%%", e);
            return this.showLimitErrorDialog(t, n)
        }
        ,
        e.prototype.showRoomLimitErrorDialog = function(e) {
            var t = g.Language.getLang("%%%chatroom_error_cant_add%%%")
              , n = g.Language.getLang("%%%chatroom_error_planlimit%%%", e);
            return this.showLimitErrorDialog(t, n)
        }
        ,
        e.prototype.showServiceAdmin = function(e) {
            "upgrade" == e ? window.open(ACCOUNT_SERVER_PATH + "/price.php") : window.open(ACCOUNT_SERVER_PATH + "/service_admin.php")
        }
        ,
        e.prototype.showOptionPlanPrice = function() {
            window.open(ACCOUNT_SERVER_PATH + "/subpackages/option/price.php")
        }
        ,
        e.prototype.showUserAdmin = function() {
            window.open(ACCOUNT_SERVER_PATH + "/user_list.php")
        }
        ,
        e.prototype.prepareStorageLimitDialog = function() {
            var e = this;
            e.storage_limit_dialog = $("#_storageLimitDialog").cwDialog({
                width: 550,
                buttonLabels: [g.Language.getLang("%%%button_close%%%")],
                buttonCancel: 0,
                open: function(t) {
                    if (t = $.extend({
                        send_type: null,
                        body: g.Language.getLang("%%%storage_cancel_send_object%%%"),
                        title: null
                    }, t),
                    e.setLimitDialog(t.body, t.send_type),
                    !t.title) {
                        var n = g.Language.getLang("%%%storage_cancel_send_cancel%%%");
                        t.title = g.Language.replaceParam(n, {
                            object: g.Language.getLang("%%%" + t.send_type + "%%%")
                        })
                    }
                    this.setOption({
                        title: t.title
                    })
                }
            })
        }
        ,
        e.prototype.showStorageLimitDialog = function(e) {
            this.storage_limit_dialog || this.prepareStorageLimitDialog(),
            $C("#_storageLimitFooter").hide(),
            this.storage_limit_dialog.open({
                send_type: e
            })
        }
        ,
        e.prototype.showStorageCautionDialog = function(e) {
            e = $.extend({
                title: null,
                body: null,
                footer: null
            }, e),
            this.storage_limit_dialog || this.prepareStorageLimitDialog();
            var t = $C("#_storageLimitFooter");
            e.footer ? t.html(e.footer).show() : t.hide(),
            this.storage_limit_dialog.open({
                body: e.body,
                title: e.title
            })
        }
        ,
        e.prototype.showLoginDialog = function(e, t) {
            t()
        }
        ,
        e.prototype.showOfflineDialog = function(e, t) {
            t(2e3)
        }
        ,
        e.prototype.showTimeoutDialog = function(e, t) {
            t()
        }
        ,
        e.prototype.onEndInitLoad = function(e) {
            this.is_end_init_loaded ? e() : this.end_init_func_list.push(e)
        }
        ,
        e.prototype.endInitLoad = function() {
            this.is_end_init_loaded = !0;
            for (var e = 0, t = this.end_init_func_list.length; e < t; e++)
                this.end_init_func_list[e]();
            this.end_init_func_list = [],
            this.setPlatformMenuModifier()
        }
        ,
        e.prototype.buildLayout = function() {
            this.model.is_first_load && ($("#_sideDashboardArea").show(),
            $("#_chatSendToolbar").show()),
            this.resizeLayout()
        }
        ,
        e.prototype.resizeLayout = function() {
            if (this.is_end_init_loaded) {
                this.resizeRoomList();
                var e = this.$window.innerHeight();
                w.SelectWindowWidth.from(window.innerWidth).matchType({
                    540: function() {
                        $C("#_adminNavi").hide(),
                        $C("#_myStatusButton").addClass("headerNameShort"),
                        $C("#_myStatusName").hide(),
                        $C("#_logo").hide()
                    },
                    730: function() {
                        $C("#_adminNavi").hide(),
                        $C("#_myStatusButton").addClass("headerNameShort"),
                        $C("#_myStatusName").hide(),
                        $C("#_logo").show()
                    },
                    912: function() {
                        $C("#_adminNavi").show(),
                        $C("#_myStatusButton").addClass("headerNameShort"),
                        $C("#_myStatusName").hide(),
                        $C("#_logo").show()
                    },
                    1124: function() {
                        $C("#_adminNavi").show(),
                        $C("#_myStatusButton").addClass("headerNameShort"),
                        $C("#_myStatusName").hide(),
                        $C("#_logo").show()
                    },
                    max: function() {
                        $C("#_adminNavi").show(),
                        $C("#_myStatusButton").removeClass("headerNameShort"),
                        $C("#_myStatusName").show(),
                        $C("#_logo").show()
                    }
                });
                var t = document.querySelector("#_chatContent")
                  , n = document.querySelector("#_sideContent")
                  , l = document.querySelector("#_subContent")
                  , u = d.CW.localStorage.getItem("ui_fold_roomsub");
                if (t && n && l && !u) {
                    var p = Math.max(Number(d.CW.localStorage.getItem("ui_subcontent_width")), d.TM.subcontent_min_width);
                    l.style.width = p + "px",
                    d.CW.application.getACL().updateRightPosition(p)
                }
                var f = e - o - r - i;
                $.cwFloatWindow.resize();
                var h = f - a;
                if ($C("#_subContent").css({
                    height: h,
                    top: a
                }),
                d.RS.view) {
                    var m = h - c - s;
                    $C("#_subContentArea").height(m),
                    d.RS.view.resizeRoomInfo(m)
                }
                d.CS.view && d.CS.view.resizeChatArea(!0),
                d.RS.resizeLayout(),
                this.adjustInformationPanelPosition($("#_openInformation"), $("#_informationBox")),
                this.adjustInformationPanelPosition($("#_openPlatformMenu"), $("#_platformMenu")),
                this.resize_delay_timer = null
            }
        }
        ,
        e.prototype.startTutorial = function() {
            (new v.TutorialView).handleStart()
        }
        ,
        e.prototype.showFirstPage = function() {}
        ,
        e.prototype.closeFirstPage = function() {}
        ,
        e.prototype.resizeRoomList = function() {}
        ,
        e.prototype.resizeSubInfo = function() {}
        ,
        e.prototype.setLimitDialog = function(e, t) {
            var n = "";
            if ("free" == this.model.plan ? (e += g.Language.getLang("%%%storage_cancel_send_object_suffix_upgrade%%%"),
            n = g.Language.getLang("%%%storage_cancel_upgrade_label%%%")) : this.model.is_business && !this.model.is_admin ? (e += g.Language.getLang("%%%storage_cancel_send_object_suffix_tell_admin%%%"),
            $("#_storageLimitButton").hide()) : (e += g.Language.getLang("%%%storage_cancel_send_object_suffix_add_storage%%%"),
            n = g.Language.getLang("%%%storage_cancel_add_storage_label%%%")),
            null != t) {
                var o = g.Language.getLang("%%%" + t + "%%%");
                null != o && (e = g.Language.replaceParam(e, {
                    object: o
                }))
            }
            $("#_storageLimitBody").html(e),
            $("#_storageLimitLink").text(n)
        }
        ,
        e.prototype.openPreviewLinkDialog = function(e, t, n, o) {
            this.previewlink_dialog || this.preparePreviewLinkDialog(),
            this.previewlink_dialog.open(e, t, n, o)
        }
        ,
        e.prototype.preparePreviewLinkDialog = function() {
            var e = this
              , t = $("#_previewLinkContent");
            e.previewlink_dialog = $("#_previewLinkDialog").cwDialog({
                buttonLabels: [g.Language.getLang("%%%open_website%%%"), g.Language.getLang("%%%button_close%%%")],
                buttonCancel: 1,
                buttonClick: function(e) {
                    switch (e) {
                    case 0:
                        window.open(this.data.url)
                    }
                },
                open: function(n, o, r, i) {
                    if (n) {
                        var a, s, c = {
                            buttonLabels: [g.Language.getLang("%%%open_website%%%"), g.Language.getLang("%%%button_close%%%")]
                        }, l = "", f = d.TM.dialog_header_height + d.TM.dialog_footer_height, h = !0, m = !1, y = !1, v = "auto", b = function(e, t, n, o) {
                            "function" == typeof e && (e = e());
                            var r = "";
                            return h && (r = 'sandbox="allow-scripts allow-same-origin allow-popups allow-forms"'),
                            "<iframe " + r + ' src="' + u.getSafeUrlString(e) + '" width="' + Number(t) + '" height="' + Number(n) + '" style="margin:auto"\n                            frameborder="0" scrolling="' + (o || "").replace(/\W/g, "") + '" seamless webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
                        };
                        switch (this.data.url = o,
                        t.empty(),
                        null !== e.preview_req && (e.preview_req.abort(),
                        e.preview_req = null),
                        n) {
                        case "teachme":
                            m = !0,
                            l = "//teachme.jp/contents/" + i + "/embed?mb=0",
                            c.title = "Teachme";
                            break;
                        case "speakerdeck":
                            m = !0,
                            y = !0,
                            c.title = "Speaker Deck",
                            e.preview_req = $.ajax({
                                type: "GET",
                                url: "./api_proxy.php?type=speakerdeck&url=" + u.urlencode(o),
                                success: function(e) {
                                    $("#_previewLinkContent").html(b(e, a, s))
                                },
                                error: function() {
                                    $("#_previewLinkContent").html(g.Language.getLang("%%%raise_error%%%"))
                                }
                            });
                            break;
                        case "slideshare":
                            m = !0,
                            y = !0,
                            l = "//www.slideshare.net/slideshow/embed_code/%%slideshow_id%%",
                            c.title = "slideshare",
                            e.preview_req = $.getJSON("//www.slideshare.net/api/oembed/2?callback=?", {
                                url: "http://www.slideshare.net/" + i + "/" + r,
                                format: "jsonp",
                                maxwidth: a,
                                maxheight: s
                            }).done(function(e) {
                                $("#_previewLinkContent").html(b(String(l).replace("%%slideshow_id%%", e.slideshow_id), a, s))
                            }).fail(function() {
                                $("#_previewLinkContent").html(g.Language.getLang("%%%raise_error%%%"))
                            });
                            break;
                        case "prezi":
                            m = !0,
                            h = !1,
                            l = "//prezi.com/embed/" + i + "/?bgcolor=ffffff&amp;lock_to_path=0&amp;autoplay=0&amp;autohide_ctrls=0&amp;features=undefined&amp;disabled_features=undefined",
                            c.title = "Prezi";
                            break;
                        case "youtube":
                            m = !0,
                            h = !1,
                            l = "//www.youtube.com/embed/" + i,
                            c.title = "YouTube";
                            break;
                        case "vimeo":
                            m = !0,
                            h = !1,
                            l = "//player.vimeo.com/video/" + i,
                            c.title = "vimeo";
                            break;
                        case "slid.es":
                            m = !0,
                            l = "//slid.es/" + i + "/embed",
                            c.title = "slid.es";
                            break;
                        case "corabbit":
                            l = "//corabbit.com/embed/" + i,
                            c.title = "Corabbit";
                            break;
                        case "googledocs":
                            h = !1,
                            l = o.replace(/(\/file\/.+)\/(edit|view)$/, "$1/preview"),
                            c.title = "Google Drive " + g.Language.getLang("%%%preview_needlogin%%%");
                            break;
                        case "cacoo":
                            l = function() {
                                var e = i.split("#")
                                  , t = e.shift()
                                  , n = e.shift();
                                return "//cacoo.com/diagrams/" + t + "/view?w=" + (a - 2) + "&h=" + (s - 30) + (n = n ? "#" + n : "")
                            }
                            ,
                            v = "no",
                            c.title = "Cacoo";
                            break;
                        case "sharepoint":
                            l = "https://" + i + "&action=interactivepreview&wdSmallView=1",
                            c.title = "Office 365";
                            break;
                        case "chatworkFilePreview":
                            h = !1,
                            c.title = $("<div></div>").text(i).html(),
                            c.buttonLabels = [g.Language.getLang("%%%open_window%%%"), g.Language.getLang("%%%button_close%%%")];
                            var w = _.filePreview.getPreviewType(i.split(".").pop())
                              , x = "https://d2cxqj2w0ktore.cloudfront.net"
                              , k = x + "/preview/iframe/index.html"
                              , C = function(t, n, o) {
                                var r = setTimeout(function() {
                                    o(),
                                    o = function() {}
                                }, 5e3);
                                $(window).on("message.previewLinkContent", function(n) {
                                    if (n.originalEvent.origin === x) {
                                        var i = JSON.parse(n.originalEvent.data);
                                        if ("fixWindowSize" === i.type) {
                                            var a = Math.min(i.width + d.TM.preview_dialog_width_padding, c.width)
                                              , s = Math.min(i.height + d.TM.preview_dialog_height_padding + 82, c.height);
                                            e.previewlink_dialog.setOption({
                                                width: a,
                                                height: s
                                            }),
                                            e.previewlink_dialog.open(),
                                            t.attr({
                                                width: a,
                                                height: s - 82
                                            }),
                                            o(),
                                            clearTimeout(r),
                                            $(window).off("message.previewLinkContent")
                                        }
                                    }
                                }),
                                t.get(0).contentWindow.postMessage(n, "*"),
                                setTimeout(function() {
                                    t.off("load")
                                })
                            };
                            if ("iframe" === w)
                                l = o;
                            else if ("source" === w)
                                y = !0,
                                e.preview_req = $.ajax({
                                    type: "GET",
                                    url: o,
                                    dataType: "text",
                                    success: function(e) {
                                        h = !1,
                                        $("#_previewLinkContent").html(b(k, a, s, v)),
                                        $("#_previewLinkContent iframe").on("load", function() {
                                            var t = JSON.stringify({
                                                type: w,
                                                body: e,
                                                fileName: i
                                            });
                                            C($(this), t, function() {})
                                        })
                                    },
                                    error: function() {
                                        $("#_previewLinkContent").html(g.Language.getLang("%%%raise_error%%%"))
                                    }
                                });
                            else {
                                if ("video" !== w)
                                    return !1;
                                l = k,
                                $("#_previewLinkDialog").parent().hide(),
                                setTimeout(function() {
                                    $("#_previewLinkContent iframe").on("load", function() {
                                        var e = $("base").prop("href") || "" + location.origin + location.pathname
                                          , t = JSON.stringify({
                                            type: w,
                                            url: e + o,
                                            fileName: i
                                        });
                                        C($(this), t, function() {
                                            $("#_previewLinkDialog").parent().show()
                                        })
                                    })
                                })
                            }
                            break;
                        default:
                            return !1
                        }
                        var S = $C(window)
                          , E = S.width()
                          , L = S.height();
                        if (m) {
                            for (this.$el.removeClass("previewFullDialog"),
                            f += d.TM.preview_dialog_height_padding,
                            a = 1120,
                            s = 840; a > 160 && (E < a + 40 || L < s + f + 40); )
                                a -= 160,
                                s -= 120;
                            c.width = a + d.TM.preview_dialog_width_padding,
                            c.height = s + f
                        } else
                            this.$el.addClass("previewFullDialog"),
                            a = E - 40,
                            s = L - f - 40,
                            c.width = a,
                            c.height = s + f;
                        n && i && (y ? $("#_previewLinkContent").html('\n                            <div style="margin:auto">\n                              <img src="' + p.CF_ASSETS_PATH + '/images/loader/img_loader_gray.gif"\n                                   alt="Loading"\n                              >' + g.Language.getLang("%%%loading%%%") + "\n                            </div>\n                        ") : $("#_previewLinkContent").html(b(l, a, s, v))),
                        this.setOption(c)
                    }
                },
                close: function() {
                    t.empty(),
                    $(window).off("message.previewLinkContent")
                }
            }),
            $("#_previewLinkReload").click(function() {
                var t = e.previewlink_dialog.data.previewlink_link;
                t && e.previewlink_dialog.open(t)
            })
        }
        ,
        e.prototype.addInformation = function(e) {
            return e = e || {},
            this.saveInformation(!1, e)
        }
        ,
        e.prototype.saveInformation = function(e, t) {
            if (t = $.extend(!0, {
                linktext: null,
                subject: null,
                body: null,
                buttonLabels: null,
                buttonClick: null,
                linkClick: null
            }, t),
            !e) {
                var n = 0;
                $.each(this.announce_infomation_dat, function(e, t) {
                    var o = parseInt(e, 10);
                    o > n && (n = o)
                }),
                e = n + 1
            }
            this.announce_infomation_dat[e] = {
                linktext: t.linktext,
                subject: t.subject,
                body: t.body,
                buttonLabels: t.buttonLabels,
                buttonClick: t.buttonClick,
                linkClick: t.linkClick
            };
            var o = $C("#_openInformation");
            return o.hasClass("notification") || o.addClass("notification"),
            e
        }
        ,
        e.prototype.deleteInformation = function(e, t) {
            delete this.announce_infomation_dat[e],
            this.renderInformation(),
            "function" != typeof t && (t = function() {}
            ),
            $.isEmptyObject(this.announce_infomation_dat) ? $C("#_notificationArea").fadeOut(function() {
                $C("#_openInformation").removeClass("notification"),
                t()
            }) : t()
        }
        ,
        e.prototype.renderInformation = function() {
            var e = this
              , t = $C("#_notificationArea");
            if ($.isEmptyObject(e.announce_infomation_dat))
                t.hide();
            else {
                var n = $C("#_notificationItemList");
                n.quickEmpty(),
                $.each(e.announce_infomation_dat, function(t, o) {
                    var r = '<li class="linkStatus" data-id="' + t + '">' + u.escape_html(o.linktext) + "</li>"
                      , i = $(r);
                    n.append(i);
                    var a = {
                        announceId: t,
                        subject: o.subject,
                        body: o.body,
                        buttonLabels: o.buttonLabels,
                        buttonClick: o.buttonClick
                    }
                      , s = o.linkClick || function() {
                        e.openAnnounceDialog(a)
                    }
                    ;
                    i.click(function() {
                        s(a)
                    })
                }),
                t.isVisible() || e.showAnnounce()
            }
        }
        ,
        e.prototype.openInformationPanel = function() {
            var e = $("#_openInformation")
              , t = $("#_informationBox");
            e.addClass("helpMenuSelected"),
            this.adjustInformationPanelPosition(e, t, !0),
            this.renderInformation(),
            t.slideDown("fast", function() {
                $.cwFloatBox.open(t, function() {
                    t.slideUp("fast", function() {
                        $C("#_openInformation").removeClass("helpMenuSelected")
                    })
                })
            })
        }
        ,
        e.prototype.setPlatformMenuModifier = function() {
            if (d.CW.application.getACL().canUseConcierge()) {
                var e = "_showDescription " + l.create("globalHeaderPlatform")("", {
                    selected: d.CW.application.getACL().isPlatformMenuOpened(),
                    notification: d.CW.application.getACL().canShowPlatformMenuNewBadge(new Date)
                });
                document.querySelector("#_openPlatformMenu").className = e
            }
        }
        ,
        e.prototype.openPlatformMenuPanel = function() {
            var e = this
              , t = $("#_openPlatformMenu")
              , n = $("#_platformMenu");
            d.CW.application.getACL().setPlatformMenuOpened(),
            e.setPlatformMenuModifier();
            var o = function() {
                n.slideUp("fast", function() {
                    d.CW.application.getACL().setPlatformMenuClosed(new Date),
                    e.setPlatformMenuModifier(),
                    n.off("click", "._menuItem", r)
                })
            }
              , r = function(e) {
                var t = e.target.getAttribute("data-event-label");
                d.TREASURE.trackEvent(t),
                o()
            };
            n.on("click", "._menuItem", r),
            e.adjustInformationPanelPosition(t, n, !0),
            e.renderInformation(),
            n.slideDown("fast", function() {
                $.cwFloatBox.open(n, o)
            })
        }
        ,
        e.prototype.adjustInformationPanelPosition = function(e, t, n) {
            var o = t;
            if (n || o.isVisible()) {
                var r, i = e.outerWidth(), a = o.outerWidth(), s = $(window).width();
                r = e.offset().left + i / 2 + a / 2 > s ? s - a : e.offset().left + i / 2 - a / 2,
                o.css("left", r)
            }
        }
        ,
        e.prototype.openAnnounceDialog = function(e) {
            var t = this;
            d.CW.application.getACL().openAnnounce({
                announceId: d.ST.announce_dat.id,
                title: e.subject,
                content: e.body,
                disableCallback: function() {
                    return t.deleteInformation(e.announceId)
                }
            }),
            $.cwFloatBox.close($C("#_informationBox"))
        }
        ,
        e.prototype.openFeedbackCompleteDialog = function() {
            this.feedback_complete_dialog || (this.feedback_complete_dialog = $("#_feedbackCompleteDialog").cwDialog({
                width: 500,
                buttonLabels: [g.Language.getLang("%%%button_close%%%")],
                buttonCancel: 0
            })),
            this.feedback_complete_dialog.open()
        }
        ,
        e.prototype.showAnnounce = function() {
            $C("#_notificationArea").fadeIn(function() {
                $C("#_openInformation").addClass("notification")
            })
        }
        ,
        e.prototype.hideAnnounce = function() {
            $C("#_notificationArea").fadeOut(function() {
                $C("#_openInformation").removeClass("notification")
            })
        }
        ,
        e.prototype.setDrafts = function() {
            var e = d.CW.application.getACL().messageAreaGetValue();
            e ? d.CS.setChatDraft(d.RM.id, e, d.CS.chatedit_id) : d.CS.deleteChatDraft(d.RM.id);
            var t = $C("#_taskNameInput").val();
            if (t) {
                var n = d.RS.view.getTaskAssignList()
                  , o = $C("#_limitButton").cwDatePicker().getVal();
                d.CS.setTaskDraft(d.RM.id, t, n, o)
            }
        }
        ,
        e
    }();
    t.ChatWorkView = k
}