<div class="form-inline row" style="margin-bottom: 20px; text-align: center;">
    <div class="form-group form-check col-xs-12 col-md-6">
        <label class="sr-only" for="onlineOnly">Apenas ramais conectados ?</label>
        <i class="fa fa-power-off fa-2x" data-toggle="tooltip" data-placement="bottom" title="Apenas ramais conectados ?"></i>
        <input type="checkbox" checked name="onlineOnly" id="onlineOnly" class="form-check-input"/>         
    </div>
    <div class="form-group form-check col-xs-12 col-md-6">
        <label class="sr-only" for="availableOnly">Apenas ramais livres ?</label>
        <i class="fa fa-child fa-2x" data-toggle="tooltip" data-placement="bottom" title="Apenas ramais livres ?"></i>
        <input type="checkbox" checked name="availableOnly" id="availableOnly" class="form-check-input"/>         
    </div>
</div>
<div class="form-group">
    <label class="sr-only" for="groups">Grupo</label>
    <div class="input-group" data-toggle="tooltip"title="Grupo de atendimento">
        <div class="input-group-addon">
            <i class="fa fa-group" aria-hidden="true"></i>
        </div>
        <select name="groups" class="form-control" id="groups"></select>
    </div>  
</div>
<script type="text/javascript">
    processTotalIpConfigure();    
    $("select[name='groups'], input[name='onlineOnly'], input[name='availableOnly']").change(processChanges);
    $("[data-toggle='tooltip']").tooltip();    
    if (typeof $("").bootstrapToggle == "function")
        $("input[type='checkbox']").bootstrapToggle({
            on: "Sim",
            off: "Todos",
            onstyle: "success",
            offstyle: "danger"
        });    
    function processChanges(){
        extensionsFilter = $("select[name='groups']").val();
        extensionsOnlineOnly = $("input[name='onlineOnly']").is(":checked");
        extensionsAvailableOnly = $("input[name='availableOnly']").is(":checked"); 
        processTotalIpDataInterface();
    }

</script>