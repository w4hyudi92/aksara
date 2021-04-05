function initOutputList(
    targetEl, 
    outputOptions, 
    subOutputOptions, 
    componentOptions, 
    outputList, 
    subOutputList, 
    componentList,
    isOutputActive,
    isSubOutputActive
)
{

    if(typeof isOutputActive == 'undefined' || isOutputActive == null) isOutputActive = false
    if(typeof isSubOutputActive == 'undefined' || isSubOutputActive == null) isSubOutputActive = false

    var baseData = {
        outputOptions: outputOptions || [],
        subOutputOptions: subOutputOptions || [],
        componentOptions: componentOptions || [],
        outputList: outputList || [],
        subOutputList: subOutputList || [],
        componentList: componentList || [],
        componentList: componentList || [],
        componentList: componentList || [],
        isOutputActive: isOutputActive,
        isSubOutputActive: isSubOutputActive
    };

    var dataCollection = {

        delimiters: ['${', '}'],

        data: function(){
            return baseData
        },

        mounted: function()
        {                        

        },

        computed: {

            isOutputSelected: function()
            {
                if(this.outputList.length == 0) return true;

                if(this.outputList.length > 1) return true;

                if(this.outputList[0].value != '') return true;

                return false;
            },

            isSubOutputSelected: function()
            {
                if(this.subOutputList.length == 0) return true;

                if(this.subOutputList.length > 1) return true;

                if(this.subOutputList[0].value != '') return true;

                return false;
            },

            isComponentSelected: function()
            {

                if(this.componentList.length == 0) return true;

                if(this.componentList.length > 1) return true;

                if(this.componentList[0].value != '') return true;

                return false;
            },

        },

        methods: {

            addData(type)
            {

                var item = {
                    value: ""
                };
                
                if(type == 'output')
                {
                    this.outputList.push(item);
                }

                if(type == 'suboutput')
                {
                    this.subOutputList.push(item);
                }

                if(type == 'component')
                {
                    this.componentList.push(item);
                }

            },

            removeData(type, index)
            {
                if(type == 'output')
                {
                    this.outputList.splice(index, 1);
                }

                if(type == 'suboutput')
                {
                    this.subOutputList.splice(index, 1);
                }

                if(type == 'component')
                {
                    this.componentList.splice(index, 1);
                }
            }
        }
    };
    
    dataCollectionApp = Vue.createApp(dataCollection)

    dataCollectionApp.component('select2simple', getSelect2VueComponentOptions('select2-template', {minimumResultsForSearch:-1}));

    dataCollectionApp.mount(targetEl)    

    return dataCollectionApp;
}




(function(){
    var aksaraFormValidator = initFormValidator(
    	'aksaraForm',
    	{
            nama_aksi: {
                required: true
            },

            komponen: {
                required: true
            }
        }
    );


    initOutputList(
        "#outputComponent",
        [{id:1, text : "Output 1"}, {id:2, text : "Output 2"}, {id:3, text : "Output 3"}],
        [{id:1, text : "Suboutput 1"}, {id:2, text : "Suboutput 2"}, {id:3, text : "Suboutput 3"}],
        [{id:1, text : "Component 1"}, {id:2, text : "Component 2"}, {id:3, text : "Component 3"}],
        [{value:""}],
        [{value:""}],
        [{value:""}]
    )


    var popupApp = initFilesPopUp(
        "#sdg-modal",
        null,
        null,
        null,
        null,
        [{"id":1,"image":"img\/01.png","title":"Penanganan Perubahan Iklim","desc":"Mengambil Tindakan Cepat untuk Mengatasi Perubahan Iklim dan Dampaknya","selected":false,"featured":true}],
        function(self)
        {
            $("#kaitanSDGContainer").html($("#sdg-modal").find(".tmpContainer").html())
        }
    );

    $("#openSDGPopup").click(function(){
        popupApp.openPopup()
    })
    

})()