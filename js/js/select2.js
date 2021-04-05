$(document).ready(function() {
	
	$('.select2-basic-single').select2({
		minimumResultsForSearch: -1
  	});

  	$('.select2-basic-search').select2();
});

function getSelect2VueComponentOptions(templateTarget, otherOptions)
{

  if(typeof otherOptions == 'undefined' || otherOptions == null)
  {
    otherOptions = {}
  }

  return {
        props: ["options", "modelValue"],
        template: "#" + templateTarget,
        mounted: function() {
          var vm = this;

          otherOptions.data = this.options;

          $(this.$el)
            // init select2
            .select2(JSON.parse(JSON.stringify(otherOptions)))
            .val(this.modelValue)
            .trigger("change")
            // emit event on change.
          
            .on("select2:select", function() {
              vm.$emit("update:modelValue", this.value);
              vm.$emit('value-change')
            });
        },
        watch: {
          modelValue: function(value) {
            // update value
            $(this.$el)
              .val(value)
              .trigger("change");
          },
          options: function(options) {
            // update options

            otherOptions.data = options;

            $(this.$el)
              .empty()
              .select2(JSON.parse(JSON.stringify(otherOptions)))
          }
        },
        unmounted: function() {
          $(this.$el)
            .off()
            .select2("destroy");
        }
  };
}