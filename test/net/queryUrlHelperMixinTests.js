import test from 'ava';

import UrlHelper from 'net/urlHelper';
import QueryUrlHelperMixin  from 'net/queryUrlHelperMixin';
import { SolarQueryPathKey, SolarQueryPublicPathKey } from 'net/queryUrlHelperMixin';

class QueryUrlHelper extends QueryUrlHelperMixin(UrlHelper) {

}

test('core:net:queryUrlHelperMixin:create', t => {
	const helper = new QueryUrlHelper();
	t.truthy(helper);
});

test('core:net:queryUrlHelperMixin:baseUrl', t => {
	const helper = new QueryUrlHelper();
	t.is(helper.baseUrl(), 'https://data.solarnetwork.net/solarquery/api/v1/sec');
});

test('core:net:queryUrlHelperMixin:baseUrl:customEnvironment', t => {
    const env = {};
    env[SolarQueryPathKey] = '/fooquery';
    env[SolarQueryPublicPathKey] = true;
	const helper = new QueryUrlHelper(env);
	t.is(helper.baseUrl(), 'https://data.solarnetwork.net/fooquery/api/v1/pub');

    helper.env(SolarQueryPublicPathKey, false);
	t.is(helper.baseUrl(), 'https://data.solarnetwork.net/fooquery/api/v1/sec');
});

test('core:net:queryUrlHelperMixin:publicQuery', t => {
	const helper = new QueryUrlHelper();
	helper.publicQuery = true;
	t.is(helper.baseUrl(), 'https://data.solarnetwork.net/solarquery/api/v1/pub');
});