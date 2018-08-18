import Intl from 'intl';
import 'intl/locale-data/jsonp/de-DE.js';

export function formatNumber(number) {
    return new Intl.NumberFormat('de-DE', {
        'minimumFractionDigits': 2,
        'maximumFractionDigits': 2
    }).format(number);
}