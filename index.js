var showurl;
$(function() {
    $(':input[type="number"]').on('input change', function() {
        if($("#phone").val().length >= 10)
            $('#phone').css("border-color", "rgb(0, 255, 0)")
        else
        $('#phone').css("border-color", "rgb(255, 0, 0)")
        if($("#ext").val().length >= 1)
            $('#ext').css("border-color", "rgb(0, 255, 0)")
        else
            $('#ext').css("border-color", "rgb(255, 0, 0)")
    });
    $('#msgbox').on('input change', function() {
        if($("#msgbox").val().length > 0)
            $('#msgbox').css("border-color", "rgb(0, 255, 0)")
        else
            $('#msgbox').css("border-color", "rgb(255, 0, 0)")
    });

});

jQuery(document).on('paste', function(e) {
    pasteData = e.originalEvent.clipboardData.getData('text')
    if (pasteData) {
        pasteData = pasteData.replace(/\D/g, '')
        var split = pasteData.replace(/.{10}$/, ' $&').split(' ')
        $("#ext").val(split[0]).change()
        $("#phone").val(split[1]).change()
        return false
    }
});
$('#country').change(function() {
    $('#ext').val($('#country option:selected').val()).change()
})
$('#chkbx').change(
    function() {
        if(('#cpl').css('display') != 'none')
            ('#cpl').css('display','none')
        if ($(this).is(':checked')){
            $("#msgbox").prop('readonly', false)
            $('#msgbox').css("border-color", "rgb(255, 0, 0)")
        }else{
            $("#msgbox").prop('readonly', true)
            $('#msgbox').css("border-color", "")
        } 
        $("#msgbox").val('')
    });
$('.submit').on('click', function() {
    if($("#phone").val().length >=10 && $("#ext").val().length >= 1){
        ext = $("#ext").val()
        phone = $("#phone").val().slice(0, 10)
        msg = $("#msgbox").val()
        if ($('#chkbx').is(':checked') && msg!='') {
            tail = ext + phone + "&text=" + msg
            showurl = "https://wa.me/" + ext + phone +"?text="+msg
        } else {
            tail = ext + phone
            showurl = "https://wa.me/" + ext + phone
        }
        wpurl = "https://api.whatsapp.com/send?phone=" + tail
        $("#msgbox").prop('readonly', true)
        $('#msgbox').css("border-color", "")
        $("#msgbox").val("\n\nYour Shareable URL is : "+ showurl)
        $("#cpl").css("display","")
        $("#chkbx").prop("checked", false)
        if (window.confirm('Redirect to WhatsApp?'))
            window.open(wpurl, '_blank')
    }
});
$('#cpl').on('click',function(){
    if (navigator.clipboard.writeText)
        navigator.clipboard.writeText(showurl)
    else
        alert("Clipboard API is not supported")
});
