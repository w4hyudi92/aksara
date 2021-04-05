function initFilesPopUp(targetEl, title, subTitle, featuredFilesTitle, allFilesTitle, selectedFiles, callbackAfterChangeFiles)
{
	var baseData = {
		title: title || "Pilih SDG yang terkait",
		subTitle: subTitle || "Plih keterkaitan aksi dengan daftar SDG yang ada dibawah ini",
		featuredFilesTitle: featuredFilesTitle || "Rekomendasi (Berdasarkan Sektor Yang Dipilih)",
		allFilesTitle: allFilesTitle || "Semua SGD",
		selectedFiles: selectedFiles || [],
		allFiles: [],
		cacheSelectedFilesIds: []
	};

	var FilesPopUp = {

		delimiters: ['${', '}'],

		mounted: function()
		{
			this.convertSelectedFilesToCache()

            this.fireCallbackAfterSelectFiles()
		},

        data: function(){
        	return baseData
        },

        methods: {
        	openPopup(filters)
        	{
        		filters = filters || {};

        		var self = this;

                filters.selectedIds = JSON.parse(JSON.stringify(this.cacheSelectedFilesIds))

        		simplePOSTRequest(
        			"sdg.json",
        			filters,
        			function(response)
        			{
        				self.setNewAllFiles(response)
        				self.updateSelectedPropertyInAllFiles()
        				self.openModal()
        			},
                    function(e)
                    {

                    }
        		)
        	},

        	openModal()
        	{
        		$(targetEl).modal()
        	},

            closeModal()
            {
                $(targetEl).modal('hide')
            },

        	setNewAllFiles(data)
        	{
        		this.allFiles = []
				this.allFiles = data
        	},

        	updateSelectedPropertyInAllFiles()
        	{
        		for (var i = 0; i < this.allFiles.length; i++) {
        			if(this.cacheSelectedFilesIds.indexOf(parseInt(this.allFiles[i].id)) > -1)
        			{
        				this.allFiles[i].selected = true;
        			}
        		}
        	},

        	changeSelectedFiles()
        	{
        		this.selectedFiles = [];
				
				for (var i = 0; i < this.allFiles.length; i++) {
					if(this.allFiles[i].selected)
					{
						this.selectedFiles.push(
							JSON.parse(JSON.stringify(this.allFiles[i]))
						)
					}
        		}

				this.convertSelectedFilesToCache()

                this.fireCallbackAfterSelectFiles()

                this.closeModal()
        	},

            fireCallbackAfterSelectFiles()
            {
                this.$nextTick(function(){
                    if(typeof callbackAfterChangeFiles == 'function')
                    {
                        callbackAfterChangeFiles(this)
                    }
                });
                

            },

        	convertSelectedFilesToCache()
        	{
        		this.cacheSelectedFilesIds = [];
        		
        		for (var i = 0; i < this.selectedFiles.length; i++) {
					this.cacheSelectedFilesIds.push(parseInt(this.selectedFiles[i].id))
				}
        	}
        }
    }

	var filesPopUpApp = Vue.createApp(FilesPopUp).mount(targetEl);

    return filesPopUpApp;
}