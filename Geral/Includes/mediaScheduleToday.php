<?php if(date("G") >= 7 && date("G") <= 21) { ?>
<aside class="schedule">
	<header>Agenda de mídia do dia <span id="lastUpdateMedia" class="label label-default "></span></header>
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
</aside>
<?php } ?>