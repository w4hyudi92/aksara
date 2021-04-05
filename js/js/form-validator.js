function initFormValidator(formId, rules)
{

    var aksaraFormValidator = $("#" + formId).validate({
        errorClass: 'has-error',
        rules: rules,
        errorPlacement: function(error, element) {

            if($(element).hasClass('select2-hidden-accessible'))
            {
                element.siblings('.select2-container').addClass('has-error')

                error.insertAfter(element.siblings('.select2-container'))

                return true;
            }

            if(element.attr('type') == 'radio')
            {
                if(element.parents('.wrapper-radio').length)
                {
                    element.parents('.wrapper-radio').parent().addClass('has-error')

                    error.appendTo(element.parents('.wrapper-radio').parent())

                    return true;
                }
            }

            error.insertAfter(element);

        },

        success: function(label, element) {

            if($(element).hasClass('select2-hidden-accessible'))
            {
                $(element).siblings('.select2-container').removeClass('has-error')

                return true;
            }

            if($($(element)).attr('type') == 'radio')
            {
                if($(element).parents('.wrapper-radio').length)
                {
                    $(element).parents('.wrapper-radio').parent().removeClass('has-error')

                    return true;
                }
            }
        },
    });

    $(document).on("change", ".select2-hidden-accessible", function () {
        if (!$.isEmptyObject(aksaraFormValidator.submitted)) {
            aksaraFormValidator.form();
        }
    });
    
    return aksaraFormValidator
}


function initArrayFieldsValidation(fields, rules)
{
    for (var i = 0; i < fields.length; i++) {
            
        $('[name^="' + fields[i] + '"]').each(function() {
            $(this).rules('remove');
            $(this).rules('add', rules);
        });
    }
}