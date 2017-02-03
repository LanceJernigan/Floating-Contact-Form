var createElement = function(tag, props, children) {

    var props = props || {}
    var children = children || []

    if (props.constructor === String)
        props = {innerHTML: props}

    var element = document.createElement(tag)

    for (var p = 0; p < Object.keys(props).length; p++) {

        var key = Object.keys(props)[p]
        var value = props[key]

        if (key.slice(0,2) === 'on') {

            var action = key.slice(2, key.length).toLowerCase()

            element.addEventListener(action, value)

        } else {

            element[key] = value

        }

    }

    for (var c = 0; c < children.length; c++) {

        element.appendChild(children[c])

    }

    return element

}

var toggleFloating = function(e) {

    var fcf = document.getElementById('fcf-root')
    var active = fcf.className.indexOf('fcf-active') > -1

    fcf.className = active ? fcf.className.replace(' fcf-active', '') : fcf.className + ' fcf-active'

}

var validateField = function(e) {

    var field = e.currentTarget
    field.className = field.className.replace(' invalid', '')

    if (field.required && field.required === true) {

        var value = field.value
        var valid = value.length > 0

        field.className = field.className + (valid ? '' : ' invalid')

    }

}

var submitForm = function(e) {

    var fields = e.currentTarget.querySelectorAll('[name^=fcf]')

    for (var f = 0; f < fields.length; f++) {

        var field = fields[f]

        if (field.required && field.required === true && ! field.value.length)
            return e.preventDefault()

    }

}

var dismissFloating = function(e) {

    e.currentTarget.remove()

}

var App = function() {

    var fields = [
        {
            field: {
                type: 'text',
                placeholder: 'Name*',
                name: 'fcf[name]',
                required: true,
                value: '',
                onBlur: validateField
            }
        },
        {
            field: {
                type: 'text',
                placeholder: 'Email*',
                name: 'fcf[email]',
                required: true,
                value: '',
                onBlur: validateField
            }
        },
        {
            field: {
                type: 'text',
                name: 'fcf[phone]',
                placeholder: 'Phone',
                value: '',
                onBlur: validateField
            }
        },
        {
            field: {
                placeholder: 'Message*',
                name: 'fcf[message]',
                required: true,
                type: 'text',
                value: '',
                onBlur: validateField
            }
        },
        {
            field: {
                type: 'submit',
                value: 'Submit',
            }
        }
    ]
    var sent = fcf.get('fcf_submitted')

    if (sent && sent === 'true')
        return createElement('div', {className: 'fcf-root fcf', id: 'fcf-root', onClick: dismissFloating}, [
            createElement('h3', 'Message Sent'),
        ])

    return createElement('div', {className: 'fcf-root fcf', id: 'fcf-root'}, [
        createElement('h3', {innerHTML: 'Contact Us', onClick: toggleFloating}),
        createElement('div', {innerHTML: 'X', className: 'fcf-close', onClick: toggleFloating}),
        createElement('div', {className: 'content'}, [
            createElement('p', 'We would love to hear from you. Reach out to us using this form and we will be in touch!'),
            createElement('form', {className: 'form', method: 'POST', onSubmit: submitForm}, fields.map( function(field) {

                return createElement('div', {className: 'field'}, [
                    createElement('input', field.field)
                ])

            }))
        ])
    ])

}

var fcf = function() {

    var actions = {}

    var trigger = function(action, args) {

        if (!action || action.constructor !== String)
            throw new Error('fcf.trigger() requires an action to call and it must be a string.')

        if (! fcf.actions.hasOwnProperty(action))
            return true

        var args = args || null

        for (var a = 0; a < fcf.actions[action].length; a++) {

            fcf.actions[action][a](args)

        }

        return true

    }

    var on = function(action, callback) {

        if (! action || action.constructor !== String)
            throw new Error ('fcf.on() requires an action to attach to and it must be a string.')

        if (! callback || callback.constructor !== Function)
            throw new Error ('fcf.on() requires a callback to trigger and it must be a function.')

        if (! fcf.actions.hasOwnProperty(action))
            fcf.actions[action] = []

        fcf.actions[action].push(callback)

    }

    var get = function(key) {

        var query = window.location.search

        if (! query || ! key)
            return false

        var args = query.split(/[\?\&]/g)
        var pair = args.filter( function(arg) {

            return arg.indexOf(key) > -1

        }).shift()

        if (!pair)
            return false

        return pair.split(/[\=]/g).pop()

    }

    return {trigger: trigger, on: on, get: get}

}()

window.fcf = fcf

jQuery(function() {
    document.body.appendChild(App())
})