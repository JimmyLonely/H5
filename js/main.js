window.onload = function () {
    var vctFileFullNames = ['FieldsMeas.xml', 'RefDose.xml'];
    var vctFileNames = ['FieldsMeas', 'RefDose'];
    var files = [];
    window.vctResults = {};
    var submitElement = document.querySelector('#submit');
    var fileElement = document.querySelector('#file');
    fileElement.addEventListener('change', function () {
        files = fileElement.files;
    })

    submitElement.addEventListener('click', function () {
        vctResults = {};
        for(var i = 0, file; file = files[i]; i++) {
            if (vctFileFullNames.indexOf(file.name) != -1) {
                var reader = new FileReader();
                (function(file) {
                    var fileName = vctFileNames[vctFileFullNames.indexOf(file.name)];
                    vctResults[fileName] = null;
                    reader.onload = function(fileContent) {
                        var result = {};
                        if (!fileContent.currentTarget.result) {
                            return false;
                        }

                        if (file.type == 'text/xml') {
                            var x2js = new X2JS({
                                attributePrefix : "$"
                            });
                            var result = x2js.xml_str2json(fileContent.currentTarget.result);
                        } else {
                            // for OPs.
                        }

                        vctResults[fileName] = result;
                    };
                })(file)
                reader.readAsText(file);
            }
        } 
    })
}