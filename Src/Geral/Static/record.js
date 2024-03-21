function loadRecordSchedule () {
  $.ajax({
    url: integracaoEndPointMain + 'Feeds/GetRecordScheduleForToday',
    type: 'GET',
    dataType: 'json',
    error: function () {
      onEmptyRecordSchedule('today')
      setTimeout(loadRecordSchedule, 15000)
    },
    success: function (data) {
      onSuccessRecordSchedule(data, 'today')
    }
  })

  $.ajax({
    url: integracaoEndPointMain + 'Feeds/GetRecordScheduleForNextNDays?days=15',
    type: 'GET',
    dataType: 'json',
    error: function () {
      onEmptyRecordSchedule('week')
      setTimeout(loadRecordSchedule, 15000)
    },
    success: function (data) {
      onSuccessRecordSchedule(data, 'week')
    }
  })
}

function onSuccessRecordSchedule (data, type) {
  if (type === 'today') {
    $('#lastUpdateRecord').text(
      'atualizado às ' + ToReadableTime(ToJavaScriptDate(data.UpdateDate))
    )
  } else if (type === 'week') {
    $('#periodRecord').text(
      ToReadableDate(ToJavaScriptDate(data.StartDate)) +
        ' até ' +
        ToReadableDate(ToJavaScriptDate(data.EndDate))
    )
    $('#lastUpdateRecordPeriod').text(
      'atualizado às ' + ToReadableDateTime(ToJavaScriptDate(data.UpdateDate))
    )
  }
  $('#' + type + 'RecordSchedule').empty()
  if (data.Records == null || data.Records.length === 0) {
    return onEmptyRecordSchedule(type)
  }
  $.each(data.Records, function (index, item) {
    parseRecordItem(item, type)
  })
  return true
}

function onEmptyRecordSchedule (type) {
  $('#' + type + 'RecordSchedule')
    .empty()
    .append(
      "<tr><td colspan='4' class='big' id='emptyRecordSchedule'>Não existem gravações agendadas</td></tr>"
    )
}

function parseRecordItem (item, type) {
  const fullDate = ToJavaScriptDate(item.Date)
  const date = ToReadableDate(fullDate)
  if (type === 'today') {
    $('#todayRecordSchedule').append(
      '<tr><td>' +
        item.Studio +
        '</td><td>' +
        item.Program +
        '</td><td>' +
        parseTeachers(item.Teachers) +
        '</td></tr>'
    )
  } else {
    $('#weekRecordSchedule').append(
      '<tr><td>' +
        date +
        '</td><td>' +
        item.Studio +
        '</td><td>' +
        item.Program +
        '</td><td>' +
        parseTeachers(item.Teachers) +
        '</td></tr>'
    )
  }
}

function parseTeachers (teachers) {
  if (teachers == null || teachers.length === 0) {
    return 'Nenhum professor cadastrado'
  }
  let data = ''
  $.each(teachers, function (index, teacher) {
    data +=
      "<div class='teacher' title='Professor: " +
      teacher.PartnerName +
      ' | Código: ' +
      teacher.PartnerCode +
      ' | Horário de gravação: ' +
      teacher.ArrivalTime +
      ' ás ' +
      teacher.DepartureTime +
      ' | Observações: ' +
      teacher.Observation +
      "'>"
    data +=
      "<span class='time'>" +
      teacher.ArrivalTime +
      ' ás ' +
      teacher.DepartureTime +
      '</span>'
    data += "<span class='name'>" + teacher.PartnerName + '</span>'
    data += "<span class='observation'>" + teacher.Observation + '</span>'
    data += '</div>'
  })
  return data
}
