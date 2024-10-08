'use strict'; export const validate = validate10; export default validate10; const schema11 = { type: 'array', items: { type: 'object', properties: { key: { type: 'string' }, name: { type: 'string' }, status: { type: 'string', nullable: true }, children: { type: 'array', items: { type: 'object', properties: { key: { type: 'string' }, name: { type: 'string' }, status: { type: 'string', nullable: true }, children: { $ref: '#' }, isCollapsed: { type: 'boolean', nullable: true } }, required: ['key', 'name'], additionalProperties: false }, nullable: true }, isCollapsed: { type: 'boolean', nullable: true } }, required: ['key', 'name'], additionalProperties: false } }; const wrapper0 = { validate: validate10 }; function validate10(data, { instancePath = '', parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null; let errors = 0; if (errors === 0) {
    if (Array.isArray(data)) {
      var valid0 = true; const len0 = data.length; for (let i0 = 0; i0 < len0; i0++) {
        let data0 = data[i0]; const _errs1 = errors; if (errors === _errs1) {
          if (data0 && typeof data0 == 'object' && !Array.isArray(data0)) {
            let missing0; if (((data0.key === undefined) && (missing0 = 'key')) || ((data0.name === undefined) && (missing0 = 'name'))) { validate10.errors = [{ instancePath: instancePath + '/' + i0, schemaPath: '#/items/required', keyword: 'required', params: { missingProperty: missing0 }, message: 'must have required property \'' + missing0 + '\'' }]; return false }
            else {
              const _errs3 = errors; for (const key0 in data0) { if (!(((((key0 === 'key') || (key0 === 'name')) || (key0 === 'status')) || (key0 === 'children')) || (key0 === 'isCollapsed'))) { validate10.errors = [{ instancePath: instancePath + '/' + i0, schemaPath: '#/items/additionalProperties', keyword: 'additionalProperties', params: { additionalProperty: key0 }, message: 'must NOT have additional properties' }]; return false; break } } if (_errs3 === errors) {
                if (data0.key !== undefined) { const _errs4 = errors; if (typeof data0.key !== 'string') { validate10.errors = [{ instancePath: instancePath + '/' + i0 + '/key', schemaPath: '#/items/properties/key/type', keyword: 'type', params: { type: 'string' }, message: 'must be string' }]; return false } var valid1 = _errs4 === errors }
                else { var valid1 = true } if (valid1) {
                  if (data0.name !== undefined) { const _errs6 = errors; if (typeof data0.name !== 'string') { validate10.errors = [{ instancePath: instancePath + '/' + i0 + '/name', schemaPath: '#/items/properties/name/type', keyword: 'type', params: { type: 'string' }, message: 'must be string' }]; return false } var valid1 = _errs6 === errors }
                  else { var valid1 = true } if (valid1) {
                    if (data0.status !== undefined) { let data3 = data0.status; const _errs8 = errors; if ((typeof data3 !== 'string') && (data3 !== null)) { validate10.errors = [{ instancePath: instancePath + '/' + i0 + '/status', schemaPath: '#/items/properties/status/type', keyword: 'type', params: { type: 'string' }, message: 'must be string' }]; return false } var valid1 = _errs8 === errors }
                    else { var valid1 = true } if (valid1) {
                      if (data0.children !== undefined) {
                        let data4 = data0.children; const _errs11 = errors; if ((!(Array.isArray(data4))) && (data4 !== null)) { validate10.errors = [{ instancePath: instancePath + '/' + i0 + '/children', schemaPath: '#/items/properties/children/type', keyword: 'type', params: { type: 'array' }, message: 'must be array' }]; return false } if (errors === _errs11) {
                          if (Array.isArray(data4)) {
                            var valid2 = true; const len1 = data4.length; for (let i1 = 0; i1 < len1; i1++) {
                              let data5 = data4[i1]; const _errs14 = errors; if (errors === _errs14) {
                                if (data5 && typeof data5 == 'object' && !Array.isArray(data5)) {
                                  let missing1; if (((data5.key === undefined) && (missing1 = 'key')) || ((data5.name === undefined) && (missing1 = 'name'))) { validate10.errors = [{ instancePath: instancePath + '/' + i0 + '/children/' + i1, schemaPath: '#/items/properties/children/items/required', keyword: 'required', params: { missingProperty: missing1 }, message: 'must have required property \'' + missing1 + '\'' }]; return false }
                                  else {
                                    const _errs16 = errors; for (const key1 in data5) { if (!(((((key1 === 'key') || (key1 === 'name')) || (key1 === 'status')) || (key1 === 'children')) || (key1 === 'isCollapsed'))) { validate10.errors = [{ instancePath: instancePath + '/' + i0 + '/children/' + i1, schemaPath: '#/items/properties/children/items/additionalProperties', keyword: 'additionalProperties', params: { additionalProperty: key1 }, message: 'must NOT have additional properties' }]; return false; break } } if (_errs16 === errors) {
                                      if (data5.key !== undefined) { const _errs17 = errors; if (typeof data5.key !== 'string') { validate10.errors = [{ instancePath: instancePath + '/' + i0 + '/children/' + i1 + '/key', schemaPath: '#/items/properties/children/items/properties/key/type', keyword: 'type', params: { type: 'string' }, message: 'must be string' }]; return false } var valid3 = _errs17 === errors }
                                      else { var valid3 = true } if (valid3) {
                                        if (data5.name !== undefined) { const _errs19 = errors; if (typeof data5.name !== 'string') { validate10.errors = [{ instancePath: instancePath + '/' + i0 + '/children/' + i1 + '/name', schemaPath: '#/items/properties/children/items/properties/name/type', keyword: 'type', params: { type: 'string' }, message: 'must be string' }]; return false } var valid3 = _errs19 === errors }
                                        else { var valid3 = true } if (valid3) {
                                          if (data5.status !== undefined) { let data8 = data5.status; const _errs21 = errors; if ((typeof data8 !== 'string') && (data8 !== null)) { validate10.errors = [{ instancePath: instancePath + '/' + i0 + '/children/' + i1 + '/status', schemaPath: '#/items/properties/children/items/properties/status/type', keyword: 'type', params: { type: 'string' }, message: 'must be string' }]; return false } var valid3 = _errs21 === errors }
                                          else { var valid3 = true } if (valid3) {
                                            if (data5.children !== undefined) { const _errs24 = errors; if (!(wrapper0.validate(data5.children, { instancePath: instancePath + '/' + i0 + '/children/' + i1 + '/children', parentData: data5, parentDataProperty: 'children', rootData }))) { vErrors = vErrors === null ? wrapper0.validate.errors : vErrors.concat(wrapper0.validate.errors); errors = vErrors.length } var valid3 = _errs24 === errors }
                                            else { var valid3 = true } if (valid3) {
                                              if (data5.isCollapsed !== undefined) { let data10 = data5.isCollapsed; const _errs25 = errors; if ((typeof data10 !== 'boolean') && (data10 !== null)) { validate10.errors = [{ instancePath: instancePath + '/' + i0 + '/children/' + i1 + '/isCollapsed', schemaPath: '#/items/properties/children/items/properties/isCollapsed/type', keyword: 'type', params: { type: 'boolean' }, message: 'must be boolean' }]; return false } var valid3 = _errs25 === errors }
                                              else { var valid3 = true }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                                else { validate10.errors = [{ instancePath: instancePath + '/' + i0 + '/children/' + i1, schemaPath: '#/items/properties/children/items/type', keyword: 'type', params: { type: 'object' }, message: 'must be object' }]; return false }
                              } var valid2 = _errs14 === errors; if (!valid2) { break }
                            }
                          }
                        } var valid1 = _errs11 === errors
                      }
                      else { var valid1 = true } if (valid1) {
                        if (data0.isCollapsed !== undefined) { let data11 = data0.isCollapsed; const _errs28 = errors; if ((typeof data11 !== 'boolean') && (data11 !== null)) { validate10.errors = [{ instancePath: instancePath + '/' + i0 + '/isCollapsed', schemaPath: '#/items/properties/isCollapsed/type', keyword: 'type', params: { type: 'boolean' }, message: 'must be boolean' }]; return false } var valid1 = _errs28 === errors }
                        else { var valid1 = true }
                      }
                    }
                  }
                }
              }
            }
          }
          else { validate10.errors = [{ instancePath: instancePath + '/' + i0, schemaPath: '#/items/type', keyword: 'type', params: { type: 'object' }, message: 'must be object' }]; return false }
        } var valid0 = _errs1 === errors; if (!valid0) { break }
      }
    }
    else { validate10.errors = [{ instancePath, schemaPath: '#/type', keyword: 'type', params: { type: 'array' }, message: 'must be array' }]; return false }
  }validate10.errors = vErrors; return errors === 0
}
