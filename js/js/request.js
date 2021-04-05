function simpleGETRequest(url, data, successCallback, errorCallback)
{
	$.ajax({
		url: url,
		data: data || null,
		dataType: 'json',
		type: 'GET',
		success: function(data)
		{
			if(typeof successCallback == 'function')
			{
				successCallback(data)
			}
		},
		error: function(data)
		{
			if(typeof errorCallback == 'function')
			{
				errorCallback(data)
			}
		}
	})
}

function simplePOSTRequest(url, data, successCallback, errorCallback)
{
	$.ajax({
		url: url,
		data: data || null,
		dataType: 'json',
		type: 'POST',
		success: function(data)
		{
			if(typeof successCallback == 'function')
			{
				successCallback(data)
			}
		},
		error: function(data)
		{
			if(typeof errorCallback == 'function')
			{
				errorCallback(data)
			}
		}
	})
}