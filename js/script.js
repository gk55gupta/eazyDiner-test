$(function() {
    console.log('document ready');

    $('.nav-toggle').on('click', function() {
        $('.navBar').toggleClass('expanded').toggleClass('collapsed');
    });

    $('.backdrop').on('click', function() {
        $('.popup').removeClass('open').addClass('closed').addClass('fadeOut');
        delay_hide('.popup', 400);
    });

    $('.tabs').on('click', function() {
        $('.tabs').removeClass('active');
        $(this).addClass('active');
        $('.sign-form').hide();
        $($(this).data('target')).show();
    });

    $('[data-trigger="popup"]').on('click', function() {
        var popup_id = $(this).attr('data-target');
        $('.popup').removeClass('fadeOut').removeClass('closed').addClass('open').show();
    });

    $('.add-more').on('click', function() {
        
    })


    $('input[type="number"]').on("keypress", function (event) {
        // neglect e in number
        if ((event.key !== undefined && event.key === "e") || event.key === "-") {
            // Handle the event with KeyboardEvent.key = e
            event.preventDefault();
        }
        if (typeof $(this).attr("maxLength") != "undefined") {
            var maxLength = $(this).attr("maxLength");
            return $(this).val().length < maxLength;
        }
    });
});

// on load
$(window).on('load', function() {
    console.log('loaded');
});

function delay_hide(target, delay) {
    setTimeout(function() {
        $(target).hide();
    }, delay);
}

function validate(event) {
    var target = event.target;
    var inputs = $(target).find('input');
    var validation_type, error_msg, isValid=false;
    
    inputs.each(function(i, ele){
        validation_type = $(ele).data('validation');
        error_msg = $(ele).data('errmessage')
        switch(validation_type) {
            case 'required':
                if(!validate_required(ele, 'inline', error_msg)) {
                    return false;
                } 
                break;
            case 'name':
                if(!validate_name(ele, 'inline', error_msg)) {
                    return false;
                } 
                break;
            case 'email':
                if(!validate_email(ele)) {
                    return false;
                } 
                break;
            case 'mobile':
                if(!validate_mobile(ele)) {
                    return false;
                } 
                break;
            
            default: 
                console.log('no validation type found');
        }
        // if we checked all input and currently on last input which is valid then form is valid
        if(i == inputs.length - 1) {
            isValid = true;
        } else {
            isValid = false;
        }
    });
    // alert('aa');
    return isValid;
}

function validate_name(ele_id, alert, msg) {
    removeErr();
    if (
        $(ele_id)
            .val()
            .trim() == ""
    ) {
        var msg1 = typeof msg != "undefined" ? msg : "Please enter Name";

        showErr(msg1, ele_id, alert);
        return false;
    }
    var msg2 = "Only A-Z character allowed";

    var iChars = "~`!@#$%^&*()+=-_[]1234567890\\';,./{}|\":<>?";
    for (var i = 0; i < $(ele_id).val().length; i++) {
        if (
            iChars.indexOf(
                $(ele_id)
                    .val()
                    .charAt(i)
            ) != -1
        ) {
            showErr(msg2, ele_id, alert);
            return false;
        }
    }
    return true;
}

function validate_email(ele_id, alert) {
    removeErr();
    if (
        $(ele_id)
            .val()
            .trim() == ""
    ) {
        showErr("Please enter email id.", ele_id, alert);
        return false;
    }
    if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(
            $(ele_id)
                .val()
                .trim()
        )
    ) {
        showErr("Invalid email id!", ele_id, alert);
        return false;
    }
    return true;
}

function validate_mobile(ele_id, alert) {
    removeErr();
    if (
        $(ele_id)
            .val()
            .trim() == ""
    ) {
        showErr("Please enter contact no.", ele_id, alert);
        return false;
    }
    if (
        isNaN($(ele_id).val()) ||
        /[\-\.\+]/.test($(ele_id).val()) ||
        !/^[0-9]*/.test($(ele_id).val())
    ) {
        showErr("Enter only numeric values.", ele_id, alert);
        return false;
    }
    if ($(ele_id).val().length != 10) {
        showErr("Enter Minimum 10 digits", ele_id, alert);
        return false;
    }
    return true;
}

function validate_required(ele_id, alert, msg) {
    if ($(ele_id)[0].localName == "textarea")
        $(ele_id)
            .parent()
            .addClass("err-textarea");

    removeErr();
    if ($(ele_id).val() === null) {
        showErr(msg, ele_id, alert);
        return false;
    }
    if (
        $(ele_id)
            .val()
            .trim() == ""
    ) {
        showErr(msg, ele_id, alert);
        return false;
    }
    return true;
}

function showErr(msg, element, type) {
    if (
        typeof type == "undefined" ||
        (typeof type !== "undefined" && type == "inline")
    ) {
        $('<span class="error"></span>').appendTo($(element).parent());
        $(element)
            .addClass("invalid")
            .siblings(".error")
            .text(msg);
    } else {
        alert(msg);
    }
    $(element).focus();
}
function removeErr() {
    $(".error")
        .siblings("input, textarea")
        .removeClass("invalid");
    $(".error").remove();
}