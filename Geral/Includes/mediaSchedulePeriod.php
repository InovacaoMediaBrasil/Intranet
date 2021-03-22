<?php if(date("G") >= 7 && date("G") <= 21) { ?>
<aside class="schedule">
    <header>Agenda de mídia de <span id="periodMedia"></span> <span id="lastUpdateMediaPeriod" class="label label-default "></span></header>
    <article>
        <table cellspacing="0" cellpadding="0">
            <thead>
                <tr>
                    <th width="20%">Data</th>
                    <th width="5%">Horário</th>
                    <th width="75%">Mídia/Produto</th>
                </tr>
            </thead>
            <tbody id="weekMediaSchedule"></tbody>
        </table>
    </article>
</aside>
<?php } ?>