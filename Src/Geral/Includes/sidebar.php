<div id="accordion" role="tablist">
        <div class="card">
            <div class="card-header" role="tab" id="linkExtensions">
                <h5 class="mb-0 text-center">
                    <a data-toggle="collapse" href="#tabExtensions" aria-expanded="true" aria-controls="tabExtensions">
                        Ramais - Total IP
                    </a>
                </h5>
            </div>
            <div id="tabExtensions" class="collapse show" role="tabpanel" aria-labelledby="linkExtensions" data-parent="#accordion">
                <div class="card-body pl-0 pr-0">
                    <div class="form-group">
                        <label>Grupo&nbsp;<select name="groups" class="form-control"></select></label>
                    </div>
                    <div class="form-check">
                        <label class="form-check-label">Apenas ramais conectados: <input type="checkbox" checked name="onlineOnly" class="form-check-input"/> 
                    </div>
                    <div class="form-check">
                        <label class="form-check-label">Apenas ramais livres: <input type="checkbox" checked name="availableOnly" class="form-check-input"/>
                    </div>
                    <ul id="extensions" class="list-group" style="font-size: 12px;">
                        <li class="list-group-item list-group-item-primary">Carregando informações</li>
                    </ul>
                 </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header" role="tab" id="linkMedias">
                <h5 class="mb-0 text-center">
                    <a data-toggle="collapse" href="#tabMedias" aria-expanded="true" aria-controls="tabMedias">
                        Agenda de mídia do dia <span id="lastUpdateMedia"></span>
                    </a>
                </h5>
            </div>

            <div id="tabMedias" class="collapse" role="tabpanel" aria-labelledby="linkMedias" data-parent="#accordion">
                <div class="card-body">
                <article>
            <table cellspacing="0" cellpadding="0">
                <thead>
                    <tr>
                        <th width="5%">Horário</th>
                        <th width="95%¨">Mídia/Produto</th>
                    </tr>
                </thead>
                <tbody id="todayMediaSchedule"></tbody>
            </table>
        </article>
                 </div>
            </div>
        </div>
    </div>