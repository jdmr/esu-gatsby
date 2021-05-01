module.exports = {
    extends: ['stylelint-config-standard'],
    rules: {
        indentation: 4,
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: [
                    'tailwind',
                    'apply',
                    'variants',
                    'responsive',
                    'screen'
                ]
            }
        ],
        'declaration-block-trailing-semicolon': null,
        'declaration-colon-newline-after': null,
        'no-descending-specificity': null
    }
}