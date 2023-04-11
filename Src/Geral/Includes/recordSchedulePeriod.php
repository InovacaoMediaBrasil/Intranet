<?php if(date("G") >= 7 && date("G") <= 21) { ?>
<aside class="schedule">
	<header>Agenda de gravação de <span id="periodRecord"></span> <span id="lastUpdateRecordPeriod" class="label label-default"></span></header>
    <article>
	    <table cellspacing="0" cellpadding="0">
		    <thead>
			    <tr>
				    <th width="20%">Data</th>
					<th width="5%">Estudio</th>
					<th width="20%">Núcleo</th>
					<th width="55%">Professores</th>
				</tr>
			</thead>
			<tbody id="weekRecordSchedule"></tbody>
		</table>
	</article>
</aside>
<?php } ?>