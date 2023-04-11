
function fixCRMService(){
    $("#fixCRMService").attr("disabled", true);
    $.confirm({
        title: "Atendimento já existente",
        content: "Você confirma que o <b>WMW Vendas</b> está exibindo a mensagem <b>Já existe um atendimento</b> para todos os usuários ?",
        theme: 'bootstrap',
        icon: 'fa fa-question',
        animation: 'scale',
        type:'orange',
        columnClass: 'col-xs-12 col-md-6 col-md-offset-3',
        buttons: {
            confirm: {
                text: "Confirmar",
                btnClass: "btn-success",
                action: function(){
                    $.ajax({
                        url: integracaoEndPointMain + "WebHooks/WMWVendasService",
                        type: "POST",
                        dataType: "JSON",
                        success: function (response){
                            if(response.Success)
                                $.alert({
                                    title: "Problema corrigido!",
                                    icon: "fa fa-thumbs-up",
                                    type: "green",
                                    theme: 'bootstrap',
                                    animation: 'scale',
                                    content: response.Data
                                });
                            else
                                $.alert({
                                    title: "Ocorreu um erro!",
                                    icon: "fa fa-thumbs-down",
                                    type: "red",
                                    theme: 'bootstrap',
                                    animation: 'scale',
                                    content: response.Data
                                });
                            setTimeout(function(){
                                $("#fixCRMService").attr("disabled", false);
                            }, 10 * 1000);
                        },
                        error: function (){
                            $.alert({
                                title: "Ocorreu um erro!",
                                content: "Por favor, tente novamente ou contate o departamento de TI!",
                                theme: 'bootstrap',
                                icon: 'fa fa-exclamation-triangle',
                                animation: 'scale',
                                type:'red',
                                columnClass: 'col-xs-12 col-md-6 col-md-offset-3'
                            });
                        }
                    })
                }
            },
            cancel:{
                text:"Não, cancelar!",
                btnClass: "btn-danger",
                action: function() {
                    $("#fixCRMService").attr("disabled", false);
                }
            }
        }
    });
}

function fixCRMExtension(){
    $("#fixCRMExtension").attr("disabled", true);
    $.confirm({
        title: "Problema com ramal",
        content: "<form action='' name='form' class='form-inline'>Informe o ramal que apresenta o problema ao efetuar atendimento no <b>WMW Vendas</b>:" +
                "<br/><br/><br/> <div class='form-group'><label>Ramal:</label> <input type='number' placeholder='70123' id='fixCRMExtensionExtension' class='form-control' required /></div>" +
                "<br /><br /><div class='form-group'><b>Vendedor:</b> <span id='extensionSellerName' style='color: gray; opacity: .5'>[Informe o ramal]</span></div>" +
                "<br /><div class='form-group'><b>Supervisor:</b> <span id='extensionSellerSupervisor' style='color: gray; opacity: .5'>[Informe o ramal]</span></div></form>",
        theme: 'bootstrap',
        icon: 'fa fa-question',
        animation: 'scale',
        type:'orange',
        columnClass: 'col-xs-12 col-md-6 col-md-offset-3',
        buttons: {
            confirm: {
                text: "Confirmar",
                btnClass: "btn-success",
                action: function(){
                    if(sellerCode == 0)
                    {
                        $.alert({
                                title:"Informe o ramal!",
                                content: "Informe o ramal e aguarde aparecer o nome do vendedor!",
                                theme: 'bootstrap',
                                icon: 'fa fa-exclamation-triangle',
                                animation: 'scale',
                                type:'red',
                                columnClass: 'col-xs-12 col-md-6 col-md-offset-3',
                            });
                        return false;
                    }
                    $.ajax({
                        url: integracaoEndPointMain + "WebHooks/WMWVendasExtension",
                        type: "POST",
                        dataType: "JSON",
                        data: {
                            sellerCode: sellerCode
                        },
                        success: function (response){
                            sellerCode = 0;
                            if(response.Success)
                                $.alert({
                                    title: "Problema corrigido!",
                                    icon: "fa fa-thumbs-up",
                                    type: "green",
                                    theme: 'bootstrap',
                                    animation: 'scale',
                                    content: response.Data
                                });
                            else
                                $.alert({
                                    title: "Ocorreu um erro!",
                                    icon: "fa fa-thumbs-down",
                                    type: "red",
                                    theme: 'bootstrap',
                                    animation: 'scale',
                                    content: response.Data
                                });
                            setTimeout(function(){
                                $("#fixCRMExtension").attr("disabled", false);
                            }, 3 * 1000);
                        },
                        error: function (){
                            $.alert({
                                title: "Ocorreu um erro!",
                                content: "Por favor, tente novamente ou contate o departamento de TI!",
                                theme: 'bootstrap',
                                icon: 'fa fa-exclamation-triangle',
                                animation: 'scale',
                                type:'red',
                                columnClass: 'col-xs-12 col-md-6 col-md-offset-3'
                            });
                            sellerCode = 0;                            
                        }
                    })
                }
            },
            cancel:{
                text:"Não, cancelar!",
                btnClass: "btn-danger",
                action: function() {
                    $("#fixCRMExtension").attr("disabled", false);
                    sellerCode = 0;
                    sellerCodeLoading = 0;
                }
            }
        }
    });
}

function getCRMSellerName(){
    var extension = parseInt($("#fixCRMExtensionExtension").val());
    if(isNaN(extension) || extension < 70000 || extension > 79999)
        return;
    if(sellerCodeLoading === extension)
        return;
    sellerCodeLoading = extension;
    $.ajax({
        url: integracaoEndPointMain + "Partners/GetPartnerByUserName?UserName=" + extension,
        type: "POST",
        dataType: "JSON",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-INTEGRACAOSERVICEAPI-KEY", "intranet");
            xhr.setRequestHeader("X-INTEGRACAOSERVICEAPI-TOKEN", "yMzanJ6ZuBNBSMlH9dtAyaf6JU5LT86x");
        },
        success: function (response){
            var className = response.IsActive && 
                            response.IsSeller && 
                            response.SellerSupervisorCode > 0 
                            ? "success" 
                            : "danger";
            var sector = response.SellerSector.length > 1 ? response.SellerSector : response.UserGroup;
            $("#extensionSellerName").html(response.SocialName + " <span class='label label-" + className + "'>" + sector.toUpperCase() + "</span>").css("color", "black").css("opacity","1");
            $("#extensionSellerSupervisor").text(response.SellerSupervisor).css("color", "black").css("opacity", "1");
            sellerCode = response.SellerCode;
        },
        error: function(){
            $.alert({
                title: "Vendedor não encontrado",
                content: "Não foi possível localizar o vendedor com o ramal " + extension,
                theme: 'bootstrap',
                icon: 'fa fa-exclamation-triangle',
                animation: 'scale',
                type:'red',
                columnClass: 'col-xs-12 col-md-6 col-md-offset-3'
            });
            sellerCode = 0;
        }
    });
}
