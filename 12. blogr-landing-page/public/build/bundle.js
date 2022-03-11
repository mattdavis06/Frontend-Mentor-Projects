
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.46.4' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const windowSize = writable(false);

    /* src/components/nav.svelte generated by Svelte v3.46.4 */
    const file$7 = "src/components/nav.svelte";

    // (121:4) {:else}
    function create_else_block$3(ctx) {
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M23.607.98l1.414 1.413L14.414 13l10.607 10.607-1.414 1.414L13 14.414 2.393 25.021.98 23.607 11.586 13 .98 2.393 2.393.98 13 11.586 23.607.98z");
    			attr_dev(path, "fill", "#FFF");
    			attr_dev(path, "fill-rule", "evenodd");
    			add_location(path, file$7, 121, 67, 6813);
    			attr_dev(svg, "width", "26");
    			attr_dev(svg, "height", "26");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg, file$7, 121, 4, 6750);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(121:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (119:4) {#if openNavCheck === false}
    function create_if_block$3(ctx) {
    	let svg;
    	let g;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			g = svg_element("g");
    			path = svg_element("path");
    			attr_dev(path, "d", "M0 0h32v2H0zM0 8h32v2H0zM0 16h32v2H0z");
    			add_location(path, file$7, 119, 102, 6674);
    			attr_dev(g, "fill", "#FFF");
    			attr_dev(g, "fill-rule", "evenodd");
    			add_location(g, file$7, 119, 67, 6639);
    			attr_dev(svg, "width", "32");
    			attr_dev(svg, "height", "18");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg, file$7, 119, 4, 6576);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, g);
    			append_dev(g, path);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(119:4) {#if openNavCheck === false}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let nav;
    	let div4;
    	let div0;
    	let svg0;
    	let path0;
    	let t0;
    	let ul3;
    	let li5;
    	let a0;
    	let t2;
    	let svg1;
    	let path1;
    	let t3;
    	let div1;
    	let ul0;
    	let li0;
    	let a1;
    	let t5;
    	let li1;
    	let a2;
    	let t7;
    	let li2;
    	let a3;
    	let t9;
    	let li3;
    	let a4;
    	let t11;
    	let li4;
    	let a5;
    	let t13;
    	let li10;
    	let a6;
    	let t15;
    	let svg2;
    	let path2;
    	let t16;
    	let div2;
    	let ul1;
    	let li6;
    	let a7;
    	let t18;
    	let li7;
    	let a8;
    	let t20;
    	let li8;
    	let a9;
    	let t22;
    	let li9;
    	let a10;
    	let t24;
    	let li14;
    	let a11;
    	let t26;
    	let svg3;
    	let path3;
    	let t27;
    	let div3;
    	let ul2;
    	let li11;
    	let a12;
    	let t29;
    	let li12;
    	let a13;
    	let t31;
    	let li13;
    	let a14;
    	let t33;
    	let div7;
    	let div5;
    	let a15;
    	let t35;
    	let div6;
    	let a16;
    	let t37;
    	let div8;
    	let t38;
    	let div19;
    	let div15;
    	let div10;
    	let div9;
    	let p0;
    	let t40;
    	let svg4;
    	let path4;
    	let t41;
    	let ul4;
    	let li15;
    	let a17;
    	let t43;
    	let li16;
    	let a18;
    	let t45;
    	let li17;
    	let a19;
    	let t47;
    	let li18;
    	let a20;
    	let t49;
    	let li19;
    	let a21;
    	let t51;
    	let div12;
    	let div11;
    	let p1;
    	let t53;
    	let svg5;
    	let path5;
    	let t54;
    	let ul5;
    	let li20;
    	let a22;
    	let t56;
    	let li21;
    	let a23;
    	let t58;
    	let li22;
    	let a24;
    	let t60;
    	let li23;
    	let a25;
    	let t62;
    	let div14;
    	let div13;
    	let p2;
    	let t64;
    	let svg6;
    	let path6;
    	let t65;
    	let ul6;
    	let li24;
    	let a26;
    	let t67;
    	let li25;
    	let a27;
    	let t69;
    	let li26;
    	let a28;
    	let t71;
    	let div18;
    	let div16;
    	let a29;
    	let t73;
    	let div17;
    	let a30;
    	let mounted;
    	let dispose;

    	function select_block_type(ctx, dirty) {
    		if (/*openNavCheck*/ ctx[1] === false) return create_if_block$3;
    		return create_else_block$3;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			div4 = element("div");
    			div0 = element("div");
    			svg0 = svg_element("svg");
    			path0 = svg_element("path");
    			t0 = space();
    			ul3 = element("ul");
    			li5 = element("li");
    			a0 = element("a");
    			a0.textContent = "Product";
    			t2 = space();
    			svg1 = svg_element("svg");
    			path1 = svg_element("path");
    			t3 = space();
    			div1 = element("div");
    			ul0 = element("ul");
    			li0 = element("li");
    			a1 = element("a");
    			a1.textContent = "Overview";
    			t5 = space();
    			li1 = element("li");
    			a2 = element("a");
    			a2.textContent = "Pricing";
    			t7 = space();
    			li2 = element("li");
    			a3 = element("a");
    			a3.textContent = "Marketplace";
    			t9 = space();
    			li3 = element("li");
    			a4 = element("a");
    			a4.textContent = "Features";
    			t11 = space();
    			li4 = element("li");
    			a5 = element("a");
    			a5.textContent = "Intergrations";
    			t13 = space();
    			li10 = element("li");
    			a6 = element("a");
    			a6.textContent = "Company";
    			t15 = space();
    			svg2 = svg_element("svg");
    			path2 = svg_element("path");
    			t16 = space();
    			div2 = element("div");
    			ul1 = element("ul");
    			li6 = element("li");
    			a7 = element("a");
    			a7.textContent = "About";
    			t18 = space();
    			li7 = element("li");
    			a8 = element("a");
    			a8.textContent = "Team";
    			t20 = space();
    			li8 = element("li");
    			a9 = element("a");
    			a9.textContent = "Blog";
    			t22 = space();
    			li9 = element("li");
    			a10 = element("a");
    			a10.textContent = "Careers";
    			t24 = space();
    			li14 = element("li");
    			a11 = element("a");
    			a11.textContent = "Connect";
    			t26 = space();
    			svg3 = svg_element("svg");
    			path3 = svg_element("path");
    			t27 = space();
    			div3 = element("div");
    			ul2 = element("ul");
    			li11 = element("li");
    			a12 = element("a");
    			a12.textContent = "Contact";
    			t29 = space();
    			li12 = element("li");
    			a13 = element("a");
    			a13.textContent = "Newsletter";
    			t31 = space();
    			li13 = element("li");
    			a14 = element("a");
    			a14.textContent = "LinkedIn";
    			t33 = space();
    			div7 = element("div");
    			div5 = element("div");
    			a15 = element("a");
    			a15.textContent = "Login";
    			t35 = space();
    			div6 = element("div");
    			a16 = element("a");
    			a16.textContent = "Sign Up";
    			t37 = space();
    			div8 = element("div");
    			if_block.c();
    			t38 = space();
    			div19 = element("div");
    			div15 = element("div");
    			div10 = element("div");
    			div9 = element("div");
    			p0 = element("p");
    			p0.textContent = "Product";
    			t40 = space();
    			svg4 = svg_element("svg");
    			path4 = svg_element("path");
    			t41 = space();
    			ul4 = element("ul");
    			li15 = element("li");
    			a17 = element("a");
    			a17.textContent = "Overview";
    			t43 = space();
    			li16 = element("li");
    			a18 = element("a");
    			a18.textContent = "Pricing";
    			t45 = space();
    			li17 = element("li");
    			a19 = element("a");
    			a19.textContent = "Marketplace";
    			t47 = space();
    			li18 = element("li");
    			a20 = element("a");
    			a20.textContent = "Features";
    			t49 = space();
    			li19 = element("li");
    			a21 = element("a");
    			a21.textContent = "Intergrations";
    			t51 = space();
    			div12 = element("div");
    			div11 = element("div");
    			p1 = element("p");
    			p1.textContent = "Company";
    			t53 = space();
    			svg5 = svg_element("svg");
    			path5 = svg_element("path");
    			t54 = space();
    			ul5 = element("ul");
    			li20 = element("li");
    			a22 = element("a");
    			a22.textContent = "About";
    			t56 = space();
    			li21 = element("li");
    			a23 = element("a");
    			a23.textContent = "Team";
    			t58 = space();
    			li22 = element("li");
    			a24 = element("a");
    			a24.textContent = "Blog";
    			t60 = space();
    			li23 = element("li");
    			a25 = element("a");
    			a25.textContent = "Careers";
    			t62 = space();
    			div14 = element("div");
    			div13 = element("div");
    			p2 = element("p");
    			p2.textContent = "Connect";
    			t64 = space();
    			svg6 = svg_element("svg");
    			path6 = svg_element("path");
    			t65 = space();
    			ul6 = element("ul");
    			li24 = element("li");
    			a26 = element("a");
    			a26.textContent = "Contact";
    			t67 = space();
    			li25 = element("li");
    			a27 = element("a");
    			a27.textContent = "Newsletter";
    			t69 = space();
    			li26 = element("li");
    			a28 = element("a");
    			a28.textContent = "LinkedIn";
    			t71 = space();
    			div18 = element("div");
    			div16 = element("div");
    			a29 = element("a");
    			a29.textContent = "Login";
    			t73 = space();
    			div17 = element("div");
    			a30 = element("a");
    			a30.textContent = "Sign Up";
    			attr_dev(path0, "d", "M0 30.803V1.486h10.653c1.982 0 3.695.31 5.14.93 1.446.619 2.56 1.5 3.345 2.642.785 1.142 1.177 2.484 1.177 4.026 0 1.404-.303 2.636-.909 3.695a6.48 6.48 0 01-2.56 2.498c1.487.578 2.643 1.494 3.469 2.746.826 1.253 1.239 2.732 1.239 4.439 0 1.707-.44 3.18-1.322 4.418-.88 1.239-2.12 2.202-3.716 2.89-1.596.688-3.482 1.033-5.657 1.033H0zM5.946 6.565v6.73h4.046c1.35 0 2.388-.282 3.118-.846.73-.564 1.094-1.397 1.094-2.498 0-1.101-.365-1.94-1.094-2.519-.73-.578-1.769-.867-3.118-.867H5.946zm0 19.159h4.624c1.542 0 2.732-.33 3.572-.991.84-.66 1.26-1.61 1.26-2.85 0-1.238-.42-2.188-1.26-2.848-.84-.66-2.03-.991-3.572-.991H5.946v7.68zm19.282 5.079V0h5.781v30.803h-5.78zm20.893.619c-1.624 0-3.124-.29-4.5-.867a10.94 10.94 0 01-3.593-2.416 10.96 10.96 0 01-2.374-3.654c-.564-1.404-.846-2.931-.846-4.583 0-1.652.289-3.173.867-4.563a11.354 11.354 0 012.415-3.654 10.96 10.96 0 013.634-2.436c1.39-.578 2.91-.867 4.562-.867 1.625 0 3.125.289 4.501.867a10.94 10.94 0 013.592 2.416 11.01 11.01 0 012.375 3.633c.564 1.39.846 2.911.846 4.563 0 1.651-.289 3.179-.867 4.583a11.297 11.297 0 01-2.416 3.675 10.96 10.96 0 01-3.633 2.436c-1.39.578-2.911.867-4.563.867zm.083-5.203c1.046 0 1.982-.275 2.808-.825.825-.551 1.48-1.301 1.96-2.25.483-.95.723-2.03.723-3.242 0-1.211-.24-2.292-.722-3.241-.482-.95-1.136-1.7-1.961-2.25-.826-.551-1.762-.826-2.808-.826-1.046 0-1.982.275-2.808.825-.826.55-1.48 1.301-1.961 2.25-.482.95-.723 2.03-.723 3.242 0 1.211.241 2.292.723 3.241.482.95 1.135 1.7 1.961 2.25.826.551 1.762.826 2.808.826zm24.155 3.964a9.13 9.13 0 01-3.86-.826 9.492 9.492 0 01-3.118-2.291c-.881-.977-1.57-2.12-2.065-3.427-.495-1.308-.743-2.719-.743-4.233 0-1.569.255-3.02.764-4.356a10.614 10.614 0 012.147-3.489 10.174 10.174 0 013.22-2.333c1.225-.564 2.554-.846 3.985-.846 1.404 0 2.67.282 3.799.846a7.402 7.402 0 012.807 2.457l.124-2.684h5.327v19.2c0 1.68-.269 3.207-.805 4.584-.537 1.376-1.301 2.56-2.292 3.55a10.231 10.231 0 01-3.53 2.292c-1.363.537-2.87.805-4.522.805-1.624 0-3.083-.254-4.376-.764a10.468 10.468 0 01-3.386-2.126 10.035 10.035 0 01-2.271-3.18L67.097 32a5.452 5.452 0 001.92 1.879c.784.454 1.672.681 2.663.681 1.074 0 2.003-.24 2.787-.723.785-.481 1.397-1.156 1.838-2.023.44-.867.66-1.879.66-3.035v-1.775a7.793 7.793 0 01-2.828 2.333c-1.143.564-2.402.846-3.778.846zm1.404-5.12c1.018 0 1.92-.254 2.704-.764a5.556 5.556 0 001.879-2.064c.468-.867.702-1.851.702-2.952 0-1.102-.234-2.086-.702-2.953a5.556 5.556 0 00-1.879-2.064c-.784-.51-1.686-.764-2.704-.764-1.019 0-1.92.255-2.705.764a5.556 5.556 0 00-1.879 2.064c-.468.867-.702 1.851-.702 2.953 0 1.1.234 2.085.702 2.952a5.556 5.556 0 001.88 2.064c.784.51 1.685.764 2.704.764zm15.607 5.74V9h5.327l.206 3.304c.55-1.157 1.294-2.044 2.23-2.664.936-.62 2.037-.929 3.303-.929.386 0 .77.035 1.156.103.386.07.73.159 1.033.269l-.62 5.698a4.361 4.361 0 00-.929-.227 7.495 7.495 0 00-.97-.062c-1.597 0-2.822.489-3.675 1.466-.853.977-1.28 2.36-1.28 4.15v10.694h-5.78z");
    			attr_dev(path0, "fill", "#FFF");
    			attr_dev(path0, "fill-rule", "nonzero");
    			add_location(path0, file$7, 53, 70, 1392);
    			attr_dev(svg0, "width", "101");
    			attr_dev(svg0, "height", "40");
    			attr_dev(svg0, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg0, file$7, 53, 6, 1328);
    			attr_dev(div0, "class", "logo svelte-uj6pav");
    			add_location(div0, file$7, 52, 4, 1303);
    			attr_dev(a0, "href", "#/");
    			attr_dev(a0, "class", "svelte-uj6pav");
    			add_location(a0, file$7, 62, 8, 4542);
    			attr_dev(path1, "fill", "none");
    			attr_dev(path1, "stroke", "#FFF");
    			attr_dev(path1, "stroke-width", "2");
    			attr_dev(path1, "opacity", ".75");
    			attr_dev(path1, "d", "M1 1l4 4 4-4");
    			add_location(path1, file$7, 63, 70, 4637);
    			attr_dev(svg1, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg1, "width", "10");
    			attr_dev(svg1, "height", "7");
    			add_location(svg1, file$7, 63, 8, 4575);
    			attr_dev(a1, "href", "#/");
    			attr_dev(a1, "class", "svelte-uj6pav");
    			add_location(a1, file$7, 66, 16, 4813);
    			attr_dev(li0, "class", "svelte-uj6pav");
    			add_location(li0, file$7, 66, 12, 4809);
    			attr_dev(a2, "href", "#/");
    			attr_dev(a2, "class", "svelte-uj6pav");
    			add_location(a2, file$7, 67, 16, 4860);
    			attr_dev(li1, "class", "svelte-uj6pav");
    			add_location(li1, file$7, 67, 12, 4856);
    			attr_dev(a3, "href", "#/");
    			attr_dev(a3, "class", "svelte-uj6pav");
    			add_location(a3, file$7, 68, 16, 4906);
    			attr_dev(li2, "class", "svelte-uj6pav");
    			add_location(li2, file$7, 68, 12, 4902);
    			attr_dev(a4, "href", "#/");
    			attr_dev(a4, "class", "svelte-uj6pav");
    			add_location(a4, file$7, 69, 16, 4956);
    			attr_dev(li3, "class", "svelte-uj6pav");
    			add_location(li3, file$7, 69, 12, 4952);
    			attr_dev(a5, "href", "#/");
    			attr_dev(a5, "class", "svelte-uj6pav");
    			add_location(a5, file$7, 70, 16, 5003);
    			attr_dev(li4, "class", "svelte-uj6pav");
    			add_location(li4, file$7, 70, 12, 4999);
    			attr_dev(ul0, "class", "inner-nav svelte-uj6pav");
    			add_location(ul0, file$7, 65, 10, 4774);
    			attr_dev(div1, "class", "nav-desktop-link svelte-uj6pav");
    			add_location(div1, file$7, 64, 8, 4733);
    			attr_dev(li5, "class", "svelte-uj6pav");
    			add_location(li5, file$7, 56, 6, 4404);
    			attr_dev(a6, "href", "#/");
    			attr_dev(a6, "class", "svelte-uj6pav");
    			add_location(a6, file$7, 80, 8, 5226);
    			attr_dev(path2, "fill", "none");
    			attr_dev(path2, "stroke", "#FFF");
    			attr_dev(path2, "stroke-width", "2");
    			attr_dev(path2, "opacity", ".75");
    			attr_dev(path2, "d", "M1 1l4 4 4-4");
    			add_location(path2, file$7, 81, 70, 5321);
    			attr_dev(svg2, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg2, "width", "10");
    			attr_dev(svg2, "height", "7");
    			add_location(svg2, file$7, 81, 8, 5259);
    			attr_dev(a7, "href", "#/");
    			attr_dev(a7, "class", "svelte-uj6pav");
    			add_location(a7, file$7, 84, 16, 5497);
    			attr_dev(li6, "class", "svelte-uj6pav");
    			add_location(li6, file$7, 84, 12, 5493);
    			attr_dev(a8, "href", "#/");
    			attr_dev(a8, "class", "svelte-uj6pav");
    			add_location(a8, file$7, 85, 16, 5541);
    			attr_dev(li7, "class", "svelte-uj6pav");
    			add_location(li7, file$7, 85, 12, 5537);
    			attr_dev(a9, "href", "#/");
    			attr_dev(a9, "class", "svelte-uj6pav");
    			add_location(a9, file$7, 86, 16, 5584);
    			attr_dev(li8, "class", "svelte-uj6pav");
    			add_location(li8, file$7, 86, 12, 5580);
    			attr_dev(a10, "href", "#/");
    			attr_dev(a10, "class", "svelte-uj6pav");
    			add_location(a10, file$7, 87, 16, 5627);
    			attr_dev(li9, "class", "svelte-uj6pav");
    			add_location(li9, file$7, 87, 12, 5623);
    			attr_dev(ul1, "class", "inner-nav svelte-uj6pav");
    			add_location(ul1, file$7, 83, 10, 5458);
    			attr_dev(div2, "class", "nav-desktop-link svelte-uj6pav");
    			add_location(div2, file$7, 82, 8, 5417);
    			attr_dev(li10, "class", "svelte-uj6pav");
    			add_location(li10, file$7, 74, 6, 5088);
    			attr_dev(a11, "href", "#/");
    			attr_dev(a11, "class", "svelte-uj6pav");
    			add_location(a11, file$7, 97, 8, 5844);
    			attr_dev(path3, "fill", "none");
    			attr_dev(path3, "stroke", "#FFF");
    			attr_dev(path3, "stroke-width", "2");
    			attr_dev(path3, "opacity", ".75");
    			attr_dev(path3, "d", "M1 1l4 4 4-4");
    			add_location(path3, file$7, 98, 70, 5939);
    			attr_dev(svg3, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg3, "width", "10");
    			attr_dev(svg3, "height", "7");
    			add_location(svg3, file$7, 98, 8, 5877);
    			attr_dev(a12, "href", "#/");
    			attr_dev(a12, "class", "svelte-uj6pav");
    			add_location(a12, file$7, 101, 16, 6115);
    			attr_dev(li11, "class", "svelte-uj6pav");
    			add_location(li11, file$7, 101, 12, 6111);
    			attr_dev(a13, "href", "#/");
    			attr_dev(a13, "class", "svelte-uj6pav");
    			add_location(a13, file$7, 102, 16, 6161);
    			attr_dev(li12, "class", "svelte-uj6pav");
    			add_location(li12, file$7, 102, 12, 6157);
    			attr_dev(a14, "href", "#/");
    			attr_dev(a14, "class", "svelte-uj6pav");
    			add_location(a14, file$7, 103, 16, 6210);
    			attr_dev(li13, "class", "svelte-uj6pav");
    			add_location(li13, file$7, 103, 12, 6206);
    			attr_dev(ul2, "class", "inner-nav svelte-uj6pav");
    			add_location(ul2, file$7, 100, 10, 6076);
    			attr_dev(div3, "class", "nav-desktop-link svelte-uj6pav");
    			add_location(div3, file$7, 99, 8, 6035);
    			attr_dev(li14, "class", "svelte-uj6pav");
    			add_location(li14, file$7, 91, 6, 5706);
    			attr_dev(ul3, "class", "nav-desktop-links svelte-uj6pav");
    			add_location(ul3, file$7, 55, 4, 4367);
    			attr_dev(div4, "class", "nav-desktop-left svelte-uj6pav");
    			add_location(div4, file$7, 51, 2, 1268);
    			attr_dev(a15, "href", "#/");
    			attr_dev(a15, "class", "svelte-uj6pav");
    			add_location(a15, file$7, 111, 6, 6367);
    			attr_dev(div5, "class", "login svelte-uj6pav");
    			add_location(div5, file$7, 110, 4, 6341);
    			attr_dev(a16, "href", "#/");
    			attr_dev(a16, "class", "svelte-uj6pav");
    			add_location(a16, file$7, 114, 6, 6435);
    			attr_dev(div6, "class", "btn solid svelte-uj6pav");
    			add_location(div6, file$7, 113, 4, 6405);
    			attr_dev(div7, "class", "nav-desktop-right svelte-uj6pav");
    			add_location(div7, file$7, 109, 2, 6305);
    			attr_dev(div8, "class", "nav-mobile svelte-uj6pav");
    			add_location(div8, file$7, 117, 2, 6482);
    			attr_dev(p0, "class", "svelte-uj6pav");
    			add_location(p0, file$7, 133, 10, 7404);
    			attr_dev(path4, "fill", "none");
    			attr_dev(path4, "stroke", "#FF7B86");
    			attr_dev(path4, "stroke-width", "2");
    			attr_dev(path4, "d", "M1 1l4 4 4-4");
    			add_location(path4, file$7, 134, 72, 7491);
    			attr_dev(svg4, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg4, "width", "10");
    			attr_dev(svg4, "height", "7");
    			add_location(svg4, file$7, 134, 10, 7429);
    			attr_dev(div9, "class", "nav-mobile-header svelte-uj6pav");
    			add_location(div9, file$7, 131, 8, 7310);
    			attr_dev(a17, "href", "#/");
    			attr_dev(a17, "class", "svelte-uj6pav");
    			add_location(a17, file$7, 137, 14, 7610);
    			attr_dev(li15, "class", "svelte-uj6pav");
    			add_location(li15, file$7, 137, 10, 7606);
    			attr_dev(a18, "href", "#/");
    			attr_dev(a18, "class", "svelte-uj6pav");
    			add_location(a18, file$7, 138, 14, 7655);
    			attr_dev(li16, "class", "svelte-uj6pav");
    			add_location(li16, file$7, 138, 10, 7651);
    			attr_dev(a19, "href", "#/");
    			attr_dev(a19, "class", "svelte-uj6pav");
    			add_location(a19, file$7, 139, 14, 7699);
    			attr_dev(li17, "class", "svelte-uj6pav");
    			add_location(li17, file$7, 139, 10, 7695);
    			attr_dev(a20, "href", "#/");
    			attr_dev(a20, "class", "svelte-uj6pav");
    			add_location(a20, file$7, 140, 14, 7747);
    			attr_dev(li18, "class", "svelte-uj6pav");
    			add_location(li18, file$7, 140, 10, 7743);
    			attr_dev(a21, "href", "#/");
    			attr_dev(a21, "class", "svelte-uj6pav");
    			add_location(a21, file$7, 141, 14, 7792);
    			attr_dev(li19, "class", "svelte-uj6pav");
    			add_location(li19, file$7, 141, 10, 7788);
    			attr_dev(ul4, "class", "svelte-uj6pav");
    			add_location(ul4, file$7, 136, 8, 7591);
    			attr_dev(div10, "class", "nav-mobile-link svelte-uj6pav");
    			add_location(div10, file$7, 130, 6, 7272);
    			attr_dev(p1, "class", "svelte-uj6pav");
    			add_location(p1, file$7, 147, 10, 7993);
    			attr_dev(path5, "fill", "none");
    			attr_dev(path5, "stroke", "#FF7B86");
    			attr_dev(path5, "stroke-width", "2");
    			attr_dev(path5, "d", "M1 1l4 4 4-4");
    			add_location(path5, file$7, 148, 72, 8080);
    			attr_dev(svg5, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg5, "width", "10");
    			attr_dev(svg5, "height", "7");
    			add_location(svg5, file$7, 148, 10, 8018);
    			attr_dev(div11, "class", "nav-mobile-header svelte-uj6pav");
    			add_location(div11, file$7, 145, 8, 7899);
    			attr_dev(a22, "href", "#/");
    			attr_dev(a22, "class", "svelte-uj6pav");
    			add_location(a22, file$7, 151, 14, 8199);
    			attr_dev(li20, "class", "svelte-uj6pav");
    			add_location(li20, file$7, 151, 10, 8195);
    			attr_dev(a23, "href", "#/");
    			attr_dev(a23, "class", "svelte-uj6pav");
    			add_location(a23, file$7, 152, 14, 8241);
    			attr_dev(li21, "class", "svelte-uj6pav");
    			add_location(li21, file$7, 152, 10, 8237);
    			attr_dev(a24, "href", "#/");
    			attr_dev(a24, "class", "svelte-uj6pav");
    			add_location(a24, file$7, 153, 14, 8282);
    			attr_dev(li22, "class", "svelte-uj6pav");
    			add_location(li22, file$7, 153, 10, 8278);
    			attr_dev(a25, "href", "#/");
    			attr_dev(a25, "class", "svelte-uj6pav");
    			add_location(a25, file$7, 154, 14, 8323);
    			attr_dev(li23, "class", "svelte-uj6pav");
    			add_location(li23, file$7, 154, 10, 8319);
    			attr_dev(ul5, "class", "svelte-uj6pav");
    			add_location(ul5, file$7, 150, 8, 8180);
    			attr_dev(div12, "class", "nav-mobile-link svelte-uj6pav");
    			add_location(div12, file$7, 144, 6, 7861);
    			attr_dev(p2, "class", "svelte-uj6pav");
    			add_location(p2, file$7, 160, 10, 8518);
    			attr_dev(path6, "fill", "none");
    			attr_dev(path6, "stroke", "#FF7B86");
    			attr_dev(path6, "stroke-width", "2");
    			attr_dev(path6, "d", "M1 1l4 4 4-4");
    			add_location(path6, file$7, 161, 72, 8605);
    			attr_dev(svg6, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg6, "width", "10");
    			attr_dev(svg6, "height", "7");
    			add_location(svg6, file$7, 161, 10, 8543);
    			attr_dev(div13, "class", "nav-mobile-header svelte-uj6pav");
    			add_location(div13, file$7, 158, 8, 8424);
    			attr_dev(a26, "href", "#/");
    			attr_dev(a26, "class", "svelte-uj6pav");
    			add_location(a26, file$7, 164, 14, 8724);
    			attr_dev(li24, "class", "svelte-uj6pav");
    			add_location(li24, file$7, 164, 10, 8720);
    			attr_dev(a27, "href", "#/");
    			attr_dev(a27, "class", "svelte-uj6pav");
    			add_location(a27, file$7, 165, 14, 8768);
    			attr_dev(li25, "class", "svelte-uj6pav");
    			add_location(li25, file$7, 165, 10, 8764);
    			attr_dev(a28, "href", "#/");
    			attr_dev(a28, "class", "svelte-uj6pav");
    			add_location(a28, file$7, 166, 14, 8815);
    			attr_dev(li26, "class", "svelte-uj6pav");
    			add_location(li26, file$7, 166, 10, 8811);
    			attr_dev(ul6, "class", "svelte-uj6pav");
    			add_location(ul6, file$7, 163, 8, 8705);
    			attr_dev(div14, "class", "nav-mobile-link svelte-uj6pav");
    			add_location(div14, file$7, 157, 6, 8386);
    			attr_dev(div15, "class", "nav-mobile-links svelte-uj6pav");
    			add_location(div15, file$7, 129, 4, 7235);
    			attr_dev(a29, "href", "#/");
    			attr_dev(a29, "class", "svelte-uj6pav");
    			add_location(a29, file$7, 172, 8, 8952);
    			attr_dev(div16, "class", "login svelte-uj6pav");
    			add_location(div16, file$7, 171, 6, 8924);
    			attr_dev(a30, "href", "#/");
    			attr_dev(a30, "class", "svelte-uj6pav");
    			add_location(a30, file$7, 175, 8, 9031);
    			attr_dev(div17, "class", "btn solid grad svelte-uj6pav");
    			add_location(div17, file$7, 174, 6, 8994);
    			attr_dev(div18, "class", "nav-mobile-btns svelte-uj6pav");
    			add_location(div18, file$7, 170, 4, 8888);
    			attr_dev(div19, "class", "nav-mobile-links-wrapper svelte-uj6pav");
    			set_style(div19, "transform", "translateX(" + (/*openNavCheck*/ ctx[1] ? '0%' : '-150%'));
    			set_style(div19, "display", /*windowOver900*/ ctx[0] ? 'none' : '');
    			set_style(div19, "transition", "0.5s linear");
    			add_location(div19, file$7, 125, 2, 7029);
    			attr_dev(nav, "class", "svelte-uj6pav");
    			add_location(nav, file$7, 50, 0, 1260);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, div4);
    			append_dev(div4, div0);
    			append_dev(div0, svg0);
    			append_dev(svg0, path0);
    			append_dev(div4, t0);
    			append_dev(div4, ul3);
    			append_dev(ul3, li5);
    			append_dev(li5, a0);
    			append_dev(li5, t2);
    			append_dev(li5, svg1);
    			append_dev(svg1, path1);
    			append_dev(li5, t3);
    			append_dev(li5, div1);
    			append_dev(div1, ul0);
    			append_dev(ul0, li0);
    			append_dev(li0, a1);
    			append_dev(ul0, t5);
    			append_dev(ul0, li1);
    			append_dev(li1, a2);
    			append_dev(ul0, t7);
    			append_dev(ul0, li2);
    			append_dev(li2, a3);
    			append_dev(ul0, t9);
    			append_dev(ul0, li3);
    			append_dev(li3, a4);
    			append_dev(ul0, t11);
    			append_dev(ul0, li4);
    			append_dev(li4, a5);
    			append_dev(ul3, t13);
    			append_dev(ul3, li10);
    			append_dev(li10, a6);
    			append_dev(li10, t15);
    			append_dev(li10, svg2);
    			append_dev(svg2, path2);
    			append_dev(li10, t16);
    			append_dev(li10, div2);
    			append_dev(div2, ul1);
    			append_dev(ul1, li6);
    			append_dev(li6, a7);
    			append_dev(ul1, t18);
    			append_dev(ul1, li7);
    			append_dev(li7, a8);
    			append_dev(ul1, t20);
    			append_dev(ul1, li8);
    			append_dev(li8, a9);
    			append_dev(ul1, t22);
    			append_dev(ul1, li9);
    			append_dev(li9, a10);
    			append_dev(ul3, t24);
    			append_dev(ul3, li14);
    			append_dev(li14, a11);
    			append_dev(li14, t26);
    			append_dev(li14, svg3);
    			append_dev(svg3, path3);
    			append_dev(li14, t27);
    			append_dev(li14, div3);
    			append_dev(div3, ul2);
    			append_dev(ul2, li11);
    			append_dev(li11, a12);
    			append_dev(ul2, t29);
    			append_dev(ul2, li12);
    			append_dev(li12, a13);
    			append_dev(ul2, t31);
    			append_dev(ul2, li13);
    			append_dev(li13, a14);
    			append_dev(nav, t33);
    			append_dev(nav, div7);
    			append_dev(div7, div5);
    			append_dev(div5, a15);
    			append_dev(div7, t35);
    			append_dev(div7, div6);
    			append_dev(div6, a16);
    			append_dev(nav, t37);
    			append_dev(nav, div8);
    			if_block.m(div8, null);
    			append_dev(nav, t38);
    			append_dev(nav, div19);
    			append_dev(div19, div15);
    			append_dev(div15, div10);
    			append_dev(div10, div9);
    			append_dev(div9, p0);
    			append_dev(div9, t40);
    			append_dev(div9, svg4);
    			append_dev(svg4, path4);
    			append_dev(div10, t41);
    			append_dev(div10, ul4);
    			append_dev(ul4, li15);
    			append_dev(li15, a17);
    			append_dev(ul4, t43);
    			append_dev(ul4, li16);
    			append_dev(li16, a18);
    			append_dev(ul4, t45);
    			append_dev(ul4, li17);
    			append_dev(li17, a19);
    			append_dev(ul4, t47);
    			append_dev(ul4, li18);
    			append_dev(li18, a20);
    			append_dev(ul4, t49);
    			append_dev(ul4, li19);
    			append_dev(li19, a21);
    			append_dev(div15, t51);
    			append_dev(div15, div12);
    			append_dev(div12, div11);
    			append_dev(div11, p1);
    			append_dev(div11, t53);
    			append_dev(div11, svg5);
    			append_dev(svg5, path5);
    			append_dev(div12, t54);
    			append_dev(div12, ul5);
    			append_dev(ul5, li20);
    			append_dev(li20, a22);
    			append_dev(ul5, t56);
    			append_dev(ul5, li21);
    			append_dev(li21, a23);
    			append_dev(ul5, t58);
    			append_dev(ul5, li22);
    			append_dev(li22, a24);
    			append_dev(ul5, t60);
    			append_dev(ul5, li23);
    			append_dev(li23, a25);
    			append_dev(div15, t62);
    			append_dev(div15, div14);
    			append_dev(div14, div13);
    			append_dev(div13, p2);
    			append_dev(div13, t64);
    			append_dev(div13, svg6);
    			append_dev(svg6, path6);
    			append_dev(div14, t65);
    			append_dev(div14, ul6);
    			append_dev(ul6, li24);
    			append_dev(li24, a26);
    			append_dev(ul6, t67);
    			append_dev(ul6, li25);
    			append_dev(li25, a27);
    			append_dev(ul6, t69);
    			append_dev(ul6, li26);
    			append_dev(li26, a28);
    			append_dev(div19, t71);
    			append_dev(div19, div18);
    			append_dev(div18, div16);
    			append_dev(div16, a29);
    			append_dev(div18, t73);
    			append_dev(div18, div17);
    			append_dev(div17, a30);

    			if (!mounted) {
    				dispose = [
    					listen_dev(li5, "mouseover", addClass, false, false, false),
    					listen_dev(li5, "focus", addClass, false, false, false),
    					listen_dev(li5, "mouseout", removeClass, false, false, false),
    					listen_dev(li5, "blur", removeClass, false, false, false),
    					listen_dev(li10, "mouseover", addClass, false, false, false),
    					listen_dev(li10, "focus", addClass, false, false, false),
    					listen_dev(li10, "mouseout", removeClass, false, false, false),
    					listen_dev(li10, "blur", removeClass, false, false, false),
    					listen_dev(li14, "mouseover", addClass, false, false, false),
    					listen_dev(li14, "focus", addClass, false, false, false),
    					listen_dev(li14, "mouseout", removeClass, false, false, false),
    					listen_dev(li14, "blur", removeClass, false, false, false),
    					listen_dev(div8, "click", /*handleMobileNavClick*/ ctx[2], false, false, false),
    					listen_dev(div9, "click", handleMobileNavLinkClick, false, false, false),
    					listen_dev(div11, "click", handleMobileNavLinkClick, false, false, false),
    					listen_dev(div13, "click", handleMobileNavLinkClick, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div8, null);
    				}
    			}

    			if (dirty & /*openNavCheck*/ 2) {
    				set_style(div19, "transform", "translateX(" + (/*openNavCheck*/ ctx[1] ? '0%' : '-150%'));
    			}

    			if (dirty & /*windowOver900*/ 1) {
    				set_style(div19, "display", /*windowOver900*/ ctx[0] ? 'none' : '');
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function addClass() {
    	this.lastElementChild.style.opacity = 1;
    	this.lastElementChild.style.visibility = 'visible';
    	this.lastElementChild.style.transition = '0.3s ease-in-out';
    	this.children[1].style.transform = 'rotate(180deg)';
    }

    function removeClass() {
    	this.lastElementChild.style.opacity = 0;
    	this.lastElementChild.style.visibility = 'hidden';
    	this.children[1].style.transform = 'rotate(0deg)';
    }

    function handleMobileNavLinkClick() {
    	let navElLink = this.nextElementSibling;

    	if (navElLink.style.opacity !== '1') {
    		this.children[1].style.transform = 'rotate(180deg)';
    		navElLink.style.height = 'auto';
    		navElLink.style.opacity = '1';
    		navElLink.style.padding = '1rem';
    	} else {
    		this.children[1].style.transform = 'rotate(0deg)';
    		navElLink.style.height = '0';
    		navElLink.style.opacity = '0';
    		navElLink.style.padding = '0';
    	}
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Nav', slots, []);
    	let windowOver900;

    	windowSize.subscribe(value => {
    		$$invalidate(0, windowOver900 = value);
    	});

    	let openNavCheck = false;

    	function handleMobileNavClick() {
    		if (!openNavCheck === true) {
    			$$invalidate(1, openNavCheck = true);
    		} else {
    			$$invalidate(1, openNavCheck = false);
    		}
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Nav> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		windowSize,
    		windowOver900,
    		addClass,
    		removeClass,
    		openNavCheck,
    		handleMobileNavClick,
    		handleMobileNavLinkClick
    	});

    	$$self.$inject_state = $$props => {
    		if ('windowOver900' in $$props) $$invalidate(0, windowOver900 = $$props.windowOver900);
    		if ('openNavCheck' in $$props) $$invalidate(1, openNavCheck = $$props.openNavCheck);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [windowOver900, openNavCheck, handleMobileNavClick];
    }

    class Nav extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Nav",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/components/header.svelte generated by Svelte v3.46.4 */
    const file$6 = "src/components/header.svelte";

    function create_fragment$6(ctx) {
    	let header;
    	let div6;
    	let nav;
    	let t0;
    	let div5;
    	let div0;
    	let h1;
    	let t2;
    	let div1;
    	let p;
    	let t4;
    	let div4;
    	let div2;
    	let a0;
    	let t6;
    	let div3;
    	let a1;
    	let current;
    	nav = new Nav({ $$inline: true });

    	const block = {
    		c: function create() {
    			header = element("header");
    			div6 = element("div");
    			create_component(nav.$$.fragment);
    			t0 = space();
    			div5 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			h1.textContent = "A modern publishing platform";
    			t2 = space();
    			div1 = element("div");
    			p = element("p");
    			p.textContent = "Grow your audience and build your online brand";
    			t4 = space();
    			div4 = element("div");
    			div2 = element("div");
    			a0 = element("a");
    			a0.textContent = "Start for free";
    			t6 = space();
    			div3 = element("div");
    			a1 = element("a");
    			a1.textContent = "Learn More";
    			attr_dev(h1, "class", "svelte-gsxjt8");
    			add_location(h1, file$6, 9, 8, 174);
    			attr_dev(div0, "class", "header-title svelte-gsxjt8");
    			add_location(div0, file$6, 8, 6, 139);
    			attr_dev(p, "class", "svelte-gsxjt8");
    			add_location(p, file$6, 12, 8, 265);
    			attr_dev(div1, "class", "header-text svelte-gsxjt8");
    			add_location(div1, file$6, 11, 6, 231);
    			attr_dev(a0, "href", "#");
    			attr_dev(a0, "class", "svelte-gsxjt8");
    			add_location(a0, file$6, 16, 10, 410);
    			attr_dev(div2, "class", "btn solid svelte-gsxjt8");
    			add_location(div2, file$6, 15, 8, 376);
    			attr_dev(a1, "href", "#");
    			attr_dev(a1, "class", "svelte-gsxjt8");
    			add_location(a1, file$6, 19, 10, 500);
    			attr_dev(div3, "class", "btn outline svelte-gsxjt8");
    			add_location(div3, file$6, 18, 8, 464);
    			attr_dev(div4, "class", "header-cta-btns svelte-gsxjt8");
    			add_location(div4, file$6, 14, 6, 338);
    			attr_dev(div5, "class", "header-wrapper svelte-gsxjt8");
    			add_location(div5, file$6, 7, 4, 104);
    			attr_dev(div6, "class", "container");
    			add_location(div6, file$6, 5, 2, 64);
    			attr_dev(header, "class", "svelte-gsxjt8");
    			add_location(header, file$6, 4, 0, 53);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, div6);
    			mount_component(nav, div6, null);
    			append_dev(div6, t0);
    			append_dev(div6, div5);
    			append_dev(div5, div0);
    			append_dev(div0, h1);
    			append_dev(div5, t2);
    			append_dev(div5, div1);
    			append_dev(div1, p);
    			append_dev(div5, t4);
    			append_dev(div5, div4);
    			append_dev(div4, div2);
    			append_dev(div2, a0);
    			append_dev(div4, t6);
    			append_dev(div4, div3);
    			append_dev(div3, a1);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(nav.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(nav.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			destroy_component(nav);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Nav });
    	return [];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/components/sectionOne.svelte generated by Svelte v3.46.4 */
    const file$5 = "src/components/sectionOne.svelte";

    // (48:10) {:else}
    function create_else_block$2(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = "/images/illustration-editor-mobile.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "illustration-editor-image");
    			attr_dev(img, "class", "svelte-i9p95l");
    			add_location(img, file$5, 48, 10, 1720);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(48:10) {:else}",
    		ctx
    	});

    	return block;
    }

    // (46:10) {#if windowOver900}
    function create_if_block$2(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = "/images/illustration-editor-desktop.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "illustration-editor-image");
    			attr_dev(img, "class", "svelte-i9p95l");
    			add_location(img, file$5, 46, 10, 1608);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(46:10) {#if windowOver900}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let section;
    	let div11;
    	let div0;
    	let h2;
    	let t1;
    	let div10;
    	let div7;
    	let div3;
    	let div1;
    	let h30;
    	let t3;
    	let div2;
    	let p0;
    	let t5;
    	let div6;
    	let div4;
    	let h31;
    	let t7;
    	let div5;
    	let p1;
    	let t9;
    	let div9;
    	let div8;

    	function select_block_type(ctx, dirty) {
    		if (/*windowOver900*/ ctx[0]) return create_if_block$2;
    		return create_else_block$2;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			section = element("section");
    			div11 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Designed for the future";
    			t1 = space();
    			div10 = element("div");
    			div7 = element("div");
    			div3 = element("div");
    			div1 = element("div");
    			h30 = element("h3");
    			h30.textContent = "Introducing an extensible editor";
    			t3 = space();
    			div2 = element("div");
    			p0 = element("p");
    			p0.textContent = "Introducing an extensible editor\n              Blogr features an exceedingly intuitive interface which lets you focus on one thing: creating content. \n              The editor supports management of multiple blogs and allows easy manipulation of embeds such as images, \n              videos, and Markdown. Extensibility with plugins and themes provide easy ways to add functionality or \n              change the looks of a blog.";
    			t5 = space();
    			div6 = element("div");
    			div4 = element("div");
    			h31 = element("h3");
    			h31.textContent = "Robust content management";
    			t7 = space();
    			div5 = element("div");
    			p1 = element("p");
    			p1.textContent = "Flexible content management enables users to easily move through posts. Increase the usability of your blog \n              by adding customized categories, sections, format, or flow. With this functionality, you’re in full control.";
    			t9 = space();
    			div9 = element("div");
    			div8 = element("div");
    			if_block.c();
    			attr_dev(h2, "class", "svelte-i9p95l");
    			add_location(h2, file$5, 13, 6, 237);
    			attr_dev(div0, "class", "heading svelte-i9p95l");
    			add_location(div0, file$5, 12, 4, 209);
    			attr_dev(h30, "class", "svelte-i9p95l");
    			add_location(h30, file$5, 19, 12, 414);
    			attr_dev(div1, "class", "sub-heading svelte-i9p95l");
    			add_location(div1, file$5, 18, 10, 376);
    			attr_dev(p0, "class", "svelte-i9p95l");
    			add_location(p0, file$5, 22, 12, 518);
    			attr_dev(div2, "class", "sub-text svelte-i9p95l");
    			add_location(div2, file$5, 21, 10, 483);
    			attr_dev(div3, "class", "sub-text-wrapper");
    			add_location(div3, file$5, 17, 8, 335);
    			attr_dev(h31, "class", "svelte-i9p95l");
    			add_location(h31, file$5, 33, 12, 1101);
    			attr_dev(div4, "class", "sub-heading svelte-i9p95l");
    			add_location(div4, file$5, 32, 10, 1063);
    			attr_dev(p1, "class", "svelte-i9p95l");
    			add_location(p1, file$5, 36, 12, 1198);
    			attr_dev(div5, "class", "sub-text svelte-i9p95l");
    			add_location(div5, file$5, 35, 10, 1163);
    			attr_dev(div6, "class", "sub-text-wrapper");
    			add_location(div6, file$5, 31, 8, 1022);
    			attr_dev(div7, "class", "col svelte-i9p95l");
    			add_location(div7, file$5, 16, 6, 309);
    			attr_dev(div8, "class", "img-wrapper svelte-i9p95l");
    			add_location(div8, file$5, 44, 8, 1542);
    			attr_dev(div9, "class", "col svelte-i9p95l");
    			add_location(div9, file$5, 43, 6, 1516);
    			attr_dev(div10, "class", "row");
    			add_location(div10, file$5, 15, 4, 285);
    			attr_dev(div11, "class", "container");
    			add_location(div11, file$5, 11, 2, 181);
    			attr_dev(section, "id", "intro");
    			attr_dev(section, "class", "svelte-i9p95l");
    			add_location(section, file$5, 10, 0, 158);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div11);
    			append_dev(div11, div0);
    			append_dev(div0, h2);
    			append_dev(div11, t1);
    			append_dev(div11, div10);
    			append_dev(div10, div7);
    			append_dev(div7, div3);
    			append_dev(div3, div1);
    			append_dev(div1, h30);
    			append_dev(div3, t3);
    			append_dev(div3, div2);
    			append_dev(div2, p0);
    			append_dev(div7, t5);
    			append_dev(div7, div6);
    			append_dev(div6, div4);
    			append_dev(div4, h31);
    			append_dev(div6, t7);
    			append_dev(div6, div5);
    			append_dev(div5, p1);
    			append_dev(div10, t9);
    			append_dev(div10, div9);
    			append_dev(div9, div8);
    			if_block.m(div8, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div8, null);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SectionOne', slots, []);
    	let windowOver900;

    	windowSize.subscribe(value => {
    		$$invalidate(0, windowOver900 = value);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SectionOne> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ windowSize, windowOver900 });

    	$$self.$inject_state = $$props => {
    		if ('windowOver900' in $$props) $$invalidate(0, windowOver900 = $$props.windowOver900);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [windowOver900];
    }

    class SectionOne extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SectionOne",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/components/mobileSection.svelte generated by Svelte v3.46.4 */

    const file$4 = "src/components/mobileSection.svelte";

    function create_fragment$4(ctx) {
    	let section;
    	let div7;
    	let div6;
    	let div1;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let div5;
    	let div4;
    	let div2;
    	let h3;
    	let t2;
    	let div3;
    	let p;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div7 = element("div");
    			div6 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			div5 = element("div");
    			div4 = element("div");
    			div2 = element("div");
    			h3 = element("h3");
    			h3.textContent = "State of the Art Infrastructure";
    			t2 = space();
    			div3 = element("div");
    			p = element("p");
    			p.textContent = "With reliability and speed in mind, worldwide data centers provide the backbone for ultra-fast connectivity. \n              This ensures your site will load instantly, no matter where your readers are, keeping your site competitive.";
    			if (!src_url_equal(img.src, img_src_value = "/images/illustration-phones.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "svelte-xkp65v");
    			add_location(img, file$4, 5, 10, 138);
    			attr_dev(div0, "class", "img-wrapper svelte-xkp65v");
    			add_location(div0, file$4, 4, 8, 102);
    			attr_dev(div1, "class", "col svelte-xkp65v");
    			add_location(div1, file$4, 3, 6, 76);
    			attr_dev(h3, "class", "svelte-xkp65v");
    			add_location(h3, file$4, 11, 12, 320);
    			attr_dev(div2, "class", "heading svelte-xkp65v");
    			add_location(div2, file$4, 10, 10, 286);
    			attr_dev(p, "class", "svelte-xkp65v");
    			add_location(p, file$4, 14, 12, 423);
    			attr_dev(div3, "class", "sub-text svelte-xkp65v");
    			add_location(div3, file$4, 13, 10, 388);
    			attr_dev(div4, "class", "text-wrapper svelte-xkp65v");
    			add_location(div4, file$4, 9, 8, 249);
    			attr_dev(div5, "class", "col svelte-xkp65v");
    			add_location(div5, file$4, 8, 6, 223);
    			attr_dev(div6, "class", "row svelte-xkp65v");
    			add_location(div6, file$4, 2, 4, 52);
    			attr_dev(div7, "class", "container svelte-xkp65v");
    			add_location(div7, file$4, 1, 2, 24);
    			attr_dev(section, "id", "mobile");
    			attr_dev(section, "class", "svelte-xkp65v");
    			add_location(section, file$4, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div7);
    			append_dev(div7, div6);
    			append_dev(div6, div1);
    			append_dev(div1, div0);
    			append_dev(div0, img);
    			append_dev(div6, t0);
    			append_dev(div6, div5);
    			append_dev(div5, div4);
    			append_dev(div4, div2);
    			append_dev(div2, h3);
    			append_dev(div4, t2);
    			append_dev(div4, div3);
    			append_dev(div3, p);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MobileSection', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MobileSection> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class MobileSection extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MobileSection",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/components/sectionTwo.svelte generated by Svelte v3.46.4 */
    const file$3 = "src/components/sectionTwo.svelte";

    // (18:10) {:else}
    function create_else_block$1(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = "/images/illustration-laptop-mobile.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "illustration-laptop-image");
    			attr_dev(img, "class", "svelte-clrfyl");
    			add_location(img, file$3, 18, 10, 440);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(18:10) {:else}",
    		ctx
    	});

    	return block;
    }

    // (16:10) {#if windowOver900}
    function create_if_block$1(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = "/images/illustration-laptop-desktop.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "illustration-laptop-image");
    			attr_dev(img, "class", "svelte-clrfyl");
    			add_location(img, file$3, 16, 10, 328);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(16:10) {#if windowOver900}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let section;
    	let div9;
    	let div8;
    	let div1;
    	let div0;
    	let t0;
    	let div7;
    	let div6;
    	let div2;
    	let h30;
    	let t2;
    	let div3;
    	let p0;
    	let t4;
    	let div4;
    	let h31;
    	let t6;
    	let div5;
    	let p1;

    	function select_block_type(ctx, dirty) {
    		if (/*windowOver900*/ ctx[0]) return create_if_block$1;
    		return create_else_block$1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			section = element("section");
    			div9 = element("div");
    			div8 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			if_block.c();
    			t0 = space();
    			div7 = element("div");
    			div6 = element("div");
    			div2 = element("div");
    			h30 = element("h3");
    			h30.textContent = "Free, open, simple";
    			t2 = space();
    			div3 = element("div");
    			p0 = element("p");
    			p0.textContent = "Blogr is a free and open source application backed by a\n            large community of helpful developers. It supports features such as code\n            syntax highlighting, RSS feeds, social media integration, third-party\n            commenting tools, and works seamlessly with Google Analytics. The\n            architecture is clean and is relatively easy to learn.";
    			t4 = space();
    			div4 = element("div");
    			h31 = element("h3");
    			h31.textContent = "Powerful tooling";
    			t6 = space();
    			div5 = element("div");
    			p1 = element("p");
    			p1.textContent = "Batteries included. We built a simple and straightforward CLI tool that\n            makes customization and deployment a breeze, but capable of producing even\n            the most complicated sites.";
    			attr_dev(div0, "class", "img-wrapper svelte-clrfyl");
    			add_location(div0, file$3, 14, 8, 262);
    			attr_dev(div1, "class", "col");
    			add_location(div1, file$3, 13, 6, 236);
    			attr_dev(h30, "class", "svelte-clrfyl");
    			add_location(h30, file$3, 25, 10, 668);
    			attr_dev(div2, "class", "sub-heading svelte-clrfyl");
    			add_location(div2, file$3, 24, 8, 632);
    			attr_dev(p0, "class", "svelte-clrfyl");
    			add_location(p0, file$3, 28, 10, 752);
    			attr_dev(div3, "class", "sub-text svelte-clrfyl");
    			add_location(div3, file$3, 27, 8, 719);
    			attr_dev(h31, "class", "svelte-clrfyl");
    			add_location(h31, file$3, 37, 10, 1210);
    			attr_dev(div4, "class", "sub-heading svelte-clrfyl");
    			add_location(div4, file$3, 36, 8, 1174);
    			attr_dev(p1, "class", "svelte-clrfyl");
    			add_location(p1, file$3, 40, 10, 1292);
    			attr_dev(div5, "class", "sub-text svelte-clrfyl");
    			add_location(div5, file$3, 39, 8, 1259);
    			attr_dev(div6, "class", "sub-text-wrapper");
    			add_location(div6, file$3, 23, 6, 593);
    			attr_dev(div7, "class", "col");
    			add_location(div7, file$3, 22, 4, 569);
    			attr_dev(div8, "class", "row");
    			add_location(div8, file$3, 12, 4, 212);
    			attr_dev(div9, "class", "container");
    			add_location(div9, file$3, 11, 2, 184);
    			attr_dev(section, "id", "features");
    			attr_dev(section, "class", "svelte-clrfyl");
    			add_location(section, file$3, 10, 0, 158);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div9);
    			append_dev(div9, div8);
    			append_dev(div8, div1);
    			append_dev(div1, div0);
    			if_block.m(div0, null);
    			append_dev(div8, t0);
    			append_dev(div8, div7);
    			append_dev(div7, div6);
    			append_dev(div6, div2);
    			append_dev(div2, h30);
    			append_dev(div6, t2);
    			append_dev(div6, div3);
    			append_dev(div3, p0);
    			append_dev(div6, t4);
    			append_dev(div6, div4);
    			append_dev(div4, h31);
    			append_dev(div6, t6);
    			append_dev(div6, div5);
    			append_dev(div5, p1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div0, null);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SectionTwo', slots, []);
    	let windowOver900;

    	windowSize.subscribe(value => {
    		$$invalidate(0, windowOver900 = value);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SectionTwo> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ windowSize, windowOver900 });

    	$$self.$inject_state = $$props => {
    		if ('windowOver900' in $$props) $$invalidate(0, windowOver900 = $$props.windowOver900);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [windowOver900];
    }

    class SectionTwo extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SectionTwo",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    const parseNumber = parseFloat;

    function joinCss(obj, separator = ';') {
      let texts;
      if (Array.isArray(obj)) {
        texts = obj.filter((text) => text);
      } else {
        texts = [];
        for (const prop in obj) {
          if (obj[prop]) {
            texts.push(`${prop}:${obj[prop]}`);
          }
        }
      }
      return texts.join(separator);
    }

    function getStyles(style, size, pull, fw) {
      let float;
      let width;
      const height = '1em';
      let lineHeight;
      let fontSize;
      let textAlign;
      let verticalAlign = '-.125em';
      const overflow = 'visible';

      if (fw) {
        textAlign = 'center';
        width = '1.25em';
      }

      if (pull) {
        float = pull;
      }

      if (size) {
        if (size == 'lg') {
          fontSize = '1.33333em';
          lineHeight = '.75em';
          verticalAlign = '-.225em';
        } else if (size == 'xs') {
          fontSize = '.75em';
        } else if (size == 'sm') {
          fontSize = '.875em';
        } else {
          fontSize = size.replace('x', 'em');
        }
      }

      return joinCss([
        joinCss({
          float,
          width,
          height,
          'line-height': lineHeight,
          'font-size': fontSize,
          'text-align': textAlign,
          'vertical-align': verticalAlign,
          'transform-origin': 'center',
          overflow,
        }),
        style,
      ]);
    }

    function getTransform(
      scale,
      translateX,
      translateY,
      rotate,
      flip,
      translateTimes = 1,
      translateUnit = '',
      rotateUnit = '',
    ) {
      let flipX = 1;
      let flipY = 1;

      if (flip) {
        if (flip == 'horizontal') {
          flipX = -1;
        } else if (flip == 'vertical') {
          flipY = -1;
        } else {
          flipX = flipY = -1;
        }
      }

      return joinCss(
        [
          `translate(${parseNumber(translateX) * translateTimes}${translateUnit},${parseNumber(translateY) * translateTimes}${translateUnit})`,
          `scale(${flipX * parseNumber(scale)},${flipY * parseNumber(scale)})`,
          rotate && `rotate(${rotate}${rotateUnit})`,
        ],
        ' ',
      );
    }

    /* node_modules/svelte-fa/src/fa.svelte generated by Svelte v3.46.4 */
    const file$2 = "node_modules/svelte-fa/src/fa.svelte";

    // (78:0) {#if i[4]}
    function create_if_block(ctx) {
    	let svg;
    	let g1;
    	let g0;
    	let g1_transform_value;
    	let g1_transform_origin_value;
    	let svg_class_value;
    	let svg_viewBox_value;

    	function select_block_type(ctx, dirty) {
    		if (typeof /*i*/ ctx[7][4] == 'string') return create_if_block_1;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			g1 = svg_element("g");
    			g0 = svg_element("g");
    			if_block.c();
    			attr_dev(g0, "transform", /*transform*/ ctx[10]);
    			add_location(g0, file$2, 91, 6, 1469);
    			attr_dev(g1, "transform", g1_transform_value = `translate(${/*i*/ ctx[7][0] / 2} ${/*i*/ ctx[7][1] / 2})`);
    			attr_dev(g1, "transform-origin", g1_transform_origin_value = `${/*i*/ ctx[7][0] / 4} 0`);
    			add_location(g1, file$2, 87, 4, 1358);
    			attr_dev(svg, "id", /*id*/ ctx[0]);
    			attr_dev(svg, "class", svg_class_value = "" + (null_to_empty(/*c*/ ctx[8]) + " svelte-1cj2gr0"));
    			attr_dev(svg, "style", /*s*/ ctx[9]);
    			attr_dev(svg, "viewBox", svg_viewBox_value = `0 0 ${/*i*/ ctx[7][0]} ${/*i*/ ctx[7][1]}`);
    			attr_dev(svg, "aria-hidden", "true");
    			attr_dev(svg, "role", "img");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg, file$2, 78, 2, 1195);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, g1);
    			append_dev(g1, g0);
    			if_block.m(g0, null);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(g0, null);
    				}
    			}

    			if (dirty & /*transform*/ 1024) {
    				attr_dev(g0, "transform", /*transform*/ ctx[10]);
    			}

    			if (dirty & /*i*/ 128 && g1_transform_value !== (g1_transform_value = `translate(${/*i*/ ctx[7][0] / 2} ${/*i*/ ctx[7][1] / 2})`)) {
    				attr_dev(g1, "transform", g1_transform_value);
    			}

    			if (dirty & /*i*/ 128 && g1_transform_origin_value !== (g1_transform_origin_value = `${/*i*/ ctx[7][0] / 4} 0`)) {
    				attr_dev(g1, "transform-origin", g1_transform_origin_value);
    			}

    			if (dirty & /*id*/ 1) {
    				attr_dev(svg, "id", /*id*/ ctx[0]);
    			}

    			if (dirty & /*c*/ 256 && svg_class_value !== (svg_class_value = "" + (null_to_empty(/*c*/ ctx[8]) + " svelte-1cj2gr0"))) {
    				attr_dev(svg, "class", svg_class_value);
    			}

    			if (dirty & /*s*/ 512) {
    				attr_dev(svg, "style", /*s*/ ctx[9]);
    			}

    			if (dirty & /*i*/ 128 && svg_viewBox_value !== (svg_viewBox_value = `0 0 ${/*i*/ ctx[7][0]} ${/*i*/ ctx[7][1]}`)) {
    				attr_dev(svg, "viewBox", svg_viewBox_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(78:0) {#if i[4]}",
    		ctx
    	});

    	return block;
    }

    // (99:8) {:else}
    function create_else_block(ctx) {
    	let path0;
    	let path0_d_value;
    	let path0_fill_value;
    	let path0_fill_opacity_value;
    	let path0_transform_value;
    	let path1;
    	let path1_d_value;
    	let path1_fill_value;
    	let path1_fill_opacity_value;
    	let path1_transform_value;

    	const block = {
    		c: function create() {
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			attr_dev(path0, "d", path0_d_value = /*i*/ ctx[7][4][0]);
    			attr_dev(path0, "fill", path0_fill_value = /*secondaryColor*/ ctx[3] || /*color*/ ctx[1] || 'currentColor');

    			attr_dev(path0, "fill-opacity", path0_fill_opacity_value = /*swapOpacity*/ ctx[6] != false
    			? /*primaryOpacity*/ ctx[4]
    			: /*secondaryOpacity*/ ctx[5]);

    			attr_dev(path0, "transform", path0_transform_value = `translate(${/*i*/ ctx[7][0] / -2} ${/*i*/ ctx[7][1] / -2})`);
    			add_location(path0, file$2, 99, 10, 1721);
    			attr_dev(path1, "d", path1_d_value = /*i*/ ctx[7][4][1]);
    			attr_dev(path1, "fill", path1_fill_value = /*primaryColor*/ ctx[2] || /*color*/ ctx[1] || 'currentColor');

    			attr_dev(path1, "fill-opacity", path1_fill_opacity_value = /*swapOpacity*/ ctx[6] != false
    			? /*secondaryOpacity*/ ctx[5]
    			: /*primaryOpacity*/ ctx[4]);

    			attr_dev(path1, "transform", path1_transform_value = `translate(${/*i*/ ctx[7][0] / -2} ${/*i*/ ctx[7][1] / -2})`);
    			add_location(path1, file$2, 105, 10, 1982);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, path0, anchor);
    			insert_dev(target, path1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*i*/ 128 && path0_d_value !== (path0_d_value = /*i*/ ctx[7][4][0])) {
    				attr_dev(path0, "d", path0_d_value);
    			}

    			if (dirty & /*secondaryColor, color*/ 10 && path0_fill_value !== (path0_fill_value = /*secondaryColor*/ ctx[3] || /*color*/ ctx[1] || 'currentColor')) {
    				attr_dev(path0, "fill", path0_fill_value);
    			}

    			if (dirty & /*swapOpacity, primaryOpacity, secondaryOpacity*/ 112 && path0_fill_opacity_value !== (path0_fill_opacity_value = /*swapOpacity*/ ctx[6] != false
    			? /*primaryOpacity*/ ctx[4]
    			: /*secondaryOpacity*/ ctx[5])) {
    				attr_dev(path0, "fill-opacity", path0_fill_opacity_value);
    			}

    			if (dirty & /*i*/ 128 && path0_transform_value !== (path0_transform_value = `translate(${/*i*/ ctx[7][0] / -2} ${/*i*/ ctx[7][1] / -2})`)) {
    				attr_dev(path0, "transform", path0_transform_value);
    			}

    			if (dirty & /*i*/ 128 && path1_d_value !== (path1_d_value = /*i*/ ctx[7][4][1])) {
    				attr_dev(path1, "d", path1_d_value);
    			}

    			if (dirty & /*primaryColor, color*/ 6 && path1_fill_value !== (path1_fill_value = /*primaryColor*/ ctx[2] || /*color*/ ctx[1] || 'currentColor')) {
    				attr_dev(path1, "fill", path1_fill_value);
    			}

    			if (dirty & /*swapOpacity, secondaryOpacity, primaryOpacity*/ 112 && path1_fill_opacity_value !== (path1_fill_opacity_value = /*swapOpacity*/ ctx[6] != false
    			? /*secondaryOpacity*/ ctx[5]
    			: /*primaryOpacity*/ ctx[4])) {
    				attr_dev(path1, "fill-opacity", path1_fill_opacity_value);
    			}

    			if (dirty & /*i*/ 128 && path1_transform_value !== (path1_transform_value = `translate(${/*i*/ ctx[7][0] / -2} ${/*i*/ ctx[7][1] / -2})`)) {
    				attr_dev(path1, "transform", path1_transform_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(path0);
    			if (detaching) detach_dev(path1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(99:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (93:8) {#if typeof i[4] == 'string'}
    function create_if_block_1(ctx) {
    	let path;
    	let path_d_value;
    	let path_fill_value;
    	let path_transform_value;

    	const block = {
    		c: function create() {
    			path = svg_element("path");
    			attr_dev(path, "d", path_d_value = /*i*/ ctx[7][4]);
    			attr_dev(path, "fill", path_fill_value = /*color*/ ctx[1] || /*primaryColor*/ ctx[2] || 'currentColor');
    			attr_dev(path, "transform", path_transform_value = `translate(${/*i*/ ctx[7][0] / -2} ${/*i*/ ctx[7][1] / -2})`);
    			add_location(path, file$2, 93, 10, 1533);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, path, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*i*/ 128 && path_d_value !== (path_d_value = /*i*/ ctx[7][4])) {
    				attr_dev(path, "d", path_d_value);
    			}

    			if (dirty & /*color, primaryColor*/ 6 && path_fill_value !== (path_fill_value = /*color*/ ctx[1] || /*primaryColor*/ ctx[2] || 'currentColor')) {
    				attr_dev(path, "fill", path_fill_value);
    			}

    			if (dirty & /*i*/ 128 && path_transform_value !== (path_transform_value = `translate(${/*i*/ ctx[7][0] / -2} ${/*i*/ ctx[7][1] / -2})`)) {
    				attr_dev(path, "transform", path_transform_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(path);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(93:8) {#if typeof i[4] == 'string'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let if_block_anchor;
    	let if_block = /*i*/ ctx[7][4] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*i*/ ctx[7][4]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Fa', slots, []);
    	let { class: clazz = '' } = $$props;
    	let { id = '' } = $$props;
    	let { style = '' } = $$props;
    	let { icon } = $$props;
    	let { size = '' } = $$props;
    	let { color = '' } = $$props;
    	let { fw = false } = $$props;
    	let { pull = '' } = $$props;
    	let { scale = 1 } = $$props;
    	let { translateX = 0 } = $$props;
    	let { translateY = 0 } = $$props;
    	let { rotate = '' } = $$props;
    	let { flip = false } = $$props;
    	let { spin = false } = $$props;
    	let { pulse = false } = $$props;
    	let { primaryColor = '' } = $$props;
    	let { secondaryColor = '' } = $$props;
    	let { primaryOpacity = 1 } = $$props;
    	let { secondaryOpacity = 0.4 } = $$props;
    	let { swapOpacity = false } = $$props;
    	let i;
    	let c;
    	let s;
    	let transform;

    	const writable_props = [
    		'class',
    		'id',
    		'style',
    		'icon',
    		'size',
    		'color',
    		'fw',
    		'pull',
    		'scale',
    		'translateX',
    		'translateY',
    		'rotate',
    		'flip',
    		'spin',
    		'pulse',
    		'primaryColor',
    		'secondaryColor',
    		'primaryOpacity',
    		'secondaryOpacity',
    		'swapOpacity'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Fa> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('class' in $$props) $$invalidate(11, clazz = $$props.class);
    		if ('id' in $$props) $$invalidate(0, id = $$props.id);
    		if ('style' in $$props) $$invalidate(12, style = $$props.style);
    		if ('icon' in $$props) $$invalidate(13, icon = $$props.icon);
    		if ('size' in $$props) $$invalidate(14, size = $$props.size);
    		if ('color' in $$props) $$invalidate(1, color = $$props.color);
    		if ('fw' in $$props) $$invalidate(15, fw = $$props.fw);
    		if ('pull' in $$props) $$invalidate(16, pull = $$props.pull);
    		if ('scale' in $$props) $$invalidate(17, scale = $$props.scale);
    		if ('translateX' in $$props) $$invalidate(18, translateX = $$props.translateX);
    		if ('translateY' in $$props) $$invalidate(19, translateY = $$props.translateY);
    		if ('rotate' in $$props) $$invalidate(20, rotate = $$props.rotate);
    		if ('flip' in $$props) $$invalidate(21, flip = $$props.flip);
    		if ('spin' in $$props) $$invalidate(22, spin = $$props.spin);
    		if ('pulse' in $$props) $$invalidate(23, pulse = $$props.pulse);
    		if ('primaryColor' in $$props) $$invalidate(2, primaryColor = $$props.primaryColor);
    		if ('secondaryColor' in $$props) $$invalidate(3, secondaryColor = $$props.secondaryColor);
    		if ('primaryOpacity' in $$props) $$invalidate(4, primaryOpacity = $$props.primaryOpacity);
    		if ('secondaryOpacity' in $$props) $$invalidate(5, secondaryOpacity = $$props.secondaryOpacity);
    		if ('swapOpacity' in $$props) $$invalidate(6, swapOpacity = $$props.swapOpacity);
    	};

    	$$self.$capture_state = () => ({
    		joinCss,
    		getStyles,
    		getTransform,
    		clazz,
    		id,
    		style,
    		icon,
    		size,
    		color,
    		fw,
    		pull,
    		scale,
    		translateX,
    		translateY,
    		rotate,
    		flip,
    		spin,
    		pulse,
    		primaryColor,
    		secondaryColor,
    		primaryOpacity,
    		secondaryOpacity,
    		swapOpacity,
    		i,
    		c,
    		s,
    		transform
    	});

    	$$self.$inject_state = $$props => {
    		if ('clazz' in $$props) $$invalidate(11, clazz = $$props.clazz);
    		if ('id' in $$props) $$invalidate(0, id = $$props.id);
    		if ('style' in $$props) $$invalidate(12, style = $$props.style);
    		if ('icon' in $$props) $$invalidate(13, icon = $$props.icon);
    		if ('size' in $$props) $$invalidate(14, size = $$props.size);
    		if ('color' in $$props) $$invalidate(1, color = $$props.color);
    		if ('fw' in $$props) $$invalidate(15, fw = $$props.fw);
    		if ('pull' in $$props) $$invalidate(16, pull = $$props.pull);
    		if ('scale' in $$props) $$invalidate(17, scale = $$props.scale);
    		if ('translateX' in $$props) $$invalidate(18, translateX = $$props.translateX);
    		if ('translateY' in $$props) $$invalidate(19, translateY = $$props.translateY);
    		if ('rotate' in $$props) $$invalidate(20, rotate = $$props.rotate);
    		if ('flip' in $$props) $$invalidate(21, flip = $$props.flip);
    		if ('spin' in $$props) $$invalidate(22, spin = $$props.spin);
    		if ('pulse' in $$props) $$invalidate(23, pulse = $$props.pulse);
    		if ('primaryColor' in $$props) $$invalidate(2, primaryColor = $$props.primaryColor);
    		if ('secondaryColor' in $$props) $$invalidate(3, secondaryColor = $$props.secondaryColor);
    		if ('primaryOpacity' in $$props) $$invalidate(4, primaryOpacity = $$props.primaryOpacity);
    		if ('secondaryOpacity' in $$props) $$invalidate(5, secondaryOpacity = $$props.secondaryOpacity);
    		if ('swapOpacity' in $$props) $$invalidate(6, swapOpacity = $$props.swapOpacity);
    		if ('i' in $$props) $$invalidate(7, i = $$props.i);
    		if ('c' in $$props) $$invalidate(8, c = $$props.c);
    		if ('s' in $$props) $$invalidate(9, s = $$props.s);
    		if ('transform' in $$props) $$invalidate(10, transform = $$props.transform);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*icon*/ 8192) {
    			$$invalidate(7, i = icon && icon.icon || [0, 0, '', [], '']);
    		}

    		if ($$self.$$.dirty & /*clazz, spin, pulse*/ 12584960) {
    			$$invalidate(8, c = joinCss([clazz, 'svelte-fa', spin && 'spin', pulse && 'pulse'], ' '));
    		}

    		if ($$self.$$.dirty & /*style, size, pull, fw*/ 118784) {
    			$$invalidate(9, s = getStyles(style, size, pull, fw));
    		}

    		if ($$self.$$.dirty & /*scale, translateX, translateY, rotate, flip*/ 4063232) {
    			$$invalidate(10, transform = getTransform(scale, translateX, translateY, rotate, flip, 512));
    		}
    	};

    	return [
    		id,
    		color,
    		primaryColor,
    		secondaryColor,
    		primaryOpacity,
    		secondaryOpacity,
    		swapOpacity,
    		i,
    		c,
    		s,
    		transform,
    		clazz,
    		style,
    		icon,
    		size,
    		fw,
    		pull,
    		scale,
    		translateX,
    		translateY,
    		rotate,
    		flip,
    		spin,
    		pulse
    	];
    }

    class Fa extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			class: 11,
    			id: 0,
    			style: 12,
    			icon: 13,
    			size: 14,
    			color: 1,
    			fw: 15,
    			pull: 16,
    			scale: 17,
    			translateX: 18,
    			translateY: 19,
    			rotate: 20,
    			flip: 21,
    			spin: 22,
    			pulse: 23,
    			primaryColor: 2,
    			secondaryColor: 3,
    			primaryOpacity: 4,
    			secondaryOpacity: 5,
    			swapOpacity: 6
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Fa",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*icon*/ ctx[13] === undefined && !('icon' in props)) {
    			console.warn("<Fa> was created without expected prop 'icon'");
    		}
    	}

    	get class() {
    		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get icon() {
    		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fw() {
    		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fw(value) {
    		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pull() {
    		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pull(value) {
    		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get scale() {
    		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set scale(value) {
    		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get translateX() {
    		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set translateX(value) {
    		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get translateY() {
    		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set translateY(value) {
    		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get rotate() {
    		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rotate(value) {
    		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get flip() {
    		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set flip(value) {
    		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get spin() {
    		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set spin(value) {
    		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pulse() {
    		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pulse(value) {
    		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get primaryColor() {
    		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set primaryColor(value) {
    		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get secondaryColor() {
    		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set secondaryColor(value) {
    		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get primaryOpacity() {
    		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set primaryOpacity(value) {
    		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get secondaryOpacity() {
    		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set secondaryOpacity(value) {
    		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get swapOpacity() {
    		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set swapOpacity(value) {
    		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /*!
     * Font Awesome Free 6.0.0 by @fontawesome - https://fontawesome.com
     * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
     * Copyright 2022 Fonticons, Inc.
     */
    var faGithub = {
      prefix: 'fab',
      iconName: 'github',
      icon: [496, 512, [], "f09b", "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"]
    };

    /* src/components/footer.svelte generated by Svelte v3.46.4 */
    const file$1 = "src/components/footer.svelte";

    function create_fragment$1(ctx) {
    	let footer;
    	let div5;
    	let div0;
    	let svg;
    	let path;
    	let t0;
    	let div4;
    	let div1;
    	let ul0;
    	let li0;
    	let t2;
    	let li1;
    	let a0;
    	let t4;
    	let li2;
    	let a1;
    	let t6;
    	let li3;
    	let a2;
    	let t8;
    	let li4;
    	let a3;
    	let t10;
    	let li5;
    	let a4;
    	let t12;
    	let div2;
    	let ul1;
    	let li6;
    	let t14;
    	let li7;
    	let a5;
    	let t16;
    	let li8;
    	let a6;
    	let t18;
    	let li9;
    	let a7;
    	let t20;
    	let li10;
    	let a8;
    	let t22;
    	let div3;
    	let ul2;
    	let li11;
    	let t24;
    	let li12;
    	let a9;
    	let t26;
    	let li13;
    	let a10;
    	let t28;
    	let li14;
    	let a11;
    	let t30;
    	let div7;
    	let t31;
    	let a12;
    	let t33;
    	let a13;
    	let t35;
    	let div6;
    	let a14;
    	let fa;
    	let current;

    	fa = new Fa({
    			props: { icon: faGithub },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			div5 = element("div");
    			div0 = element("div");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			t0 = space();
    			div4 = element("div");
    			div1 = element("div");
    			ul0 = element("ul");
    			li0 = element("li");
    			li0.textContent = "Product";
    			t2 = space();
    			li1 = element("li");
    			a0 = element("a");
    			a0.textContent = "Overview";
    			t4 = space();
    			li2 = element("li");
    			a1 = element("a");
    			a1.textContent = "Pricing";
    			t6 = space();
    			li3 = element("li");
    			a2 = element("a");
    			a2.textContent = "Marketplace";
    			t8 = space();
    			li4 = element("li");
    			a3 = element("a");
    			a3.textContent = "Features";
    			t10 = space();
    			li5 = element("li");
    			a4 = element("a");
    			a4.textContent = "Intergrations";
    			t12 = space();
    			div2 = element("div");
    			ul1 = element("ul");
    			li6 = element("li");
    			li6.textContent = "Company";
    			t14 = space();
    			li7 = element("li");
    			a5 = element("a");
    			a5.textContent = "About";
    			t16 = space();
    			li8 = element("li");
    			a6 = element("a");
    			a6.textContent = "Team";
    			t18 = space();
    			li9 = element("li");
    			a7 = element("a");
    			a7.textContent = "Blog";
    			t20 = space();
    			li10 = element("li");
    			a8 = element("a");
    			a8.textContent = "Careers";
    			t22 = space();
    			div3 = element("div");
    			ul2 = element("ul");
    			li11 = element("li");
    			li11.textContent = "Connect";
    			t24 = space();
    			li12 = element("li");
    			a9 = element("a");
    			a9.textContent = "Contact";
    			t26 = space();
    			li13 = element("li");
    			a10 = element("a");
    			a10.textContent = "Newsletter";
    			t28 = space();
    			li14 = element("li");
    			a11 = element("a");
    			a11.textContent = "LinkedIn";
    			t30 = space();
    			div7 = element("div");
    			t31 = text("Challenge by\n    ");
    			a12 = element("a");
    			a12.textContent = "Frontend Mentor";
    			t33 = text(". Coded by\n    ");
    			a13 = element("a");
    			a13.textContent = "Matt Davis";
    			t35 = text(".\n    ");
    			div6 = element("div");
    			a14 = element("a");
    			create_component(fa.$$.fragment);
    			attr_dev(path, "d", "M0 30.803V1.486h10.653c1.982 0 3.695.31 5.14.93 1.446.619 2.56 1.5 3.345 2.642.785 1.142 1.177 2.484 1.177 4.026 0 1.404-.303 2.636-.909 3.695a6.48 6.48 0 01-2.56 2.498c1.487.578 2.643 1.494 3.469 2.746.826 1.253 1.239 2.732 1.239 4.439 0 1.707-.44 3.18-1.322 4.418-.88 1.239-2.12 2.202-3.716 2.89-1.596.688-3.482 1.033-5.657 1.033H0zM5.946 6.565v6.73h4.046c1.35 0 2.388-.282 3.118-.846.73-.564 1.094-1.397 1.094-2.498 0-1.101-.365-1.94-1.094-2.519-.73-.578-1.769-.867-3.118-.867H5.946zm0 19.159h4.624c1.542 0 2.732-.33 3.572-.991.84-.66 1.26-1.61 1.26-2.85 0-1.238-.42-2.188-1.26-2.848-.84-.66-2.03-.991-3.572-.991H5.946v7.68zm19.282 5.079V0h5.781v30.803h-5.78zm20.893.619c-1.624 0-3.124-.29-4.5-.867a10.94 10.94 0 01-3.593-2.416 10.96 10.96 0 01-2.374-3.654c-.564-1.404-.846-2.931-.846-4.583 0-1.652.289-3.173.867-4.563a11.354 11.354 0 012.415-3.654 10.96 10.96 0 013.634-2.436c1.39-.578 2.91-.867 4.562-.867 1.625 0 3.125.289 4.501.867a10.94 10.94 0 013.592 2.416 11.01 11.01 0 012.375 3.633c.564 1.39.846 2.911.846 4.563 0 1.651-.289 3.179-.867 4.583a11.297 11.297 0 01-2.416 3.675 10.96 10.96 0 01-3.633 2.436c-1.39.578-2.911.867-4.563.867zm.083-5.203c1.046 0 1.982-.275 2.808-.825.825-.551 1.48-1.301 1.96-2.25.483-.95.723-2.03.723-3.242 0-1.211-.24-2.292-.722-3.241-.482-.95-1.136-1.7-1.961-2.25-.826-.551-1.762-.826-2.808-.826-1.046 0-1.982.275-2.808.825-.826.55-1.48 1.301-1.961 2.25-.482.95-.723 2.03-.723 3.242 0 1.211.241 2.292.723 3.241.482.95 1.135 1.7 1.961 2.25.826.551 1.762.826 2.808.826zm24.155 3.964a9.13 9.13 0 01-3.86-.826 9.492 9.492 0 01-3.118-2.291c-.881-.977-1.57-2.12-2.065-3.427-.495-1.308-.743-2.719-.743-4.233 0-1.569.255-3.02.764-4.356a10.614 10.614 0 012.147-3.489 10.174 10.174 0 013.22-2.333c1.225-.564 2.554-.846 3.985-.846 1.404 0 2.67.282 3.799.846a7.402 7.402 0 012.807 2.457l.124-2.684h5.327v19.2c0 1.68-.269 3.207-.805 4.584-.537 1.376-1.301 2.56-2.292 3.55a10.231 10.231 0 01-3.53 2.292c-1.363.537-2.87.805-4.522.805-1.624 0-3.083-.254-4.376-.764a10.468 10.468 0 01-3.386-2.126 10.035 10.035 0 01-2.271-3.18L67.097 32a5.452 5.452 0 001.92 1.879c.784.454 1.672.681 2.663.681 1.074 0 2.003-.24 2.787-.723.785-.481 1.397-1.156 1.838-2.023.44-.867.66-1.879.66-3.035v-1.775a7.793 7.793 0 01-2.828 2.333c-1.143.564-2.402.846-3.778.846zm1.404-5.12c1.018 0 1.92-.254 2.704-.764a5.556 5.556 0 001.879-2.064c.468-.867.702-1.851.702-2.952 0-1.102-.234-2.086-.702-2.953a5.556 5.556 0 00-1.879-2.064c-.784-.51-1.686-.764-2.704-.764-1.019 0-1.92.255-2.705.764a5.556 5.556 0 00-1.879 2.064c-.468.867-.702 1.851-.702 2.953 0 1.1.234 2.085.702 2.952a5.556 5.556 0 001.88 2.064c.784.51 1.685.764 2.704.764zm15.607 5.74V9h5.327l.206 3.304c.55-1.157 1.294-2.044 2.23-2.664.936-.62 2.037-.929 3.303-.929.386 0 .77.035 1.156.103.386.07.73.159 1.033.269l-.62 5.698a4.361 4.361 0 00-.929-.227 7.495 7.495 0 00-.97-.062c-1.597 0-2.822.489-3.675 1.466-.853.977-1.28 2.36-1.28 4.15v10.694h-5.78z");
    			attr_dev(path, "fill", "#FFF");
    			attr_dev(path, "fill-rule", "nonzero");
    			add_location(path, file$1, 8, 70, 246);
    			attr_dev(svg, "width", "101");
    			attr_dev(svg, "height", "40");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg, file$1, 8, 6, 182);
    			attr_dev(div0, "class", "logo");
    			add_location(div0, file$1, 7, 4, 157);
    			attr_dev(li0, "class", "svelte-1mcln6n");
    			add_location(li0, file$1, 13, 10, 3297);
    			attr_dev(a0, "href", "#/");
    			add_location(a0, file$1, 14, 14, 3328);
    			attr_dev(li1, "class", "svelte-1mcln6n");
    			add_location(li1, file$1, 14, 10, 3324);
    			attr_dev(a1, "href", "#/");
    			add_location(a1, file$1, 15, 14, 3373);
    			attr_dev(li2, "class", "svelte-1mcln6n");
    			add_location(li2, file$1, 15, 10, 3369);
    			attr_dev(a2, "href", "#/");
    			add_location(a2, file$1, 16, 14, 3417);
    			attr_dev(li3, "class", "svelte-1mcln6n");
    			add_location(li3, file$1, 16, 10, 3413);
    			attr_dev(a3, "href", "#/");
    			add_location(a3, file$1, 17, 14, 3465);
    			attr_dev(li4, "class", "svelte-1mcln6n");
    			add_location(li4, file$1, 17, 10, 3461);
    			attr_dev(a4, "href", "#/");
    			add_location(a4, file$1, 18, 14, 3510);
    			attr_dev(li5, "class", "svelte-1mcln6n");
    			add_location(li5, file$1, 18, 10, 3506);
    			attr_dev(ul0, "class", "svelte-1mcln6n");
    			add_location(ul0, file$1, 12, 8, 3282);
    			attr_dev(div1, "class", "product");
    			add_location(div1, file$1, 11, 6, 3252);
    			attr_dev(li6, "class", "svelte-1mcln6n");
    			add_location(li6, file$1, 23, 10, 3624);
    			attr_dev(a5, "href", "#/");
    			add_location(a5, file$1, 24, 14, 3655);
    			attr_dev(li7, "class", "svelte-1mcln6n");
    			add_location(li7, file$1, 24, 10, 3651);
    			attr_dev(a6, "href", "#/");
    			add_location(a6, file$1, 25, 14, 3697);
    			attr_dev(li8, "class", "svelte-1mcln6n");
    			add_location(li8, file$1, 25, 10, 3693);
    			attr_dev(a7, "href", "#/");
    			add_location(a7, file$1, 26, 14, 3738);
    			attr_dev(li9, "class", "svelte-1mcln6n");
    			add_location(li9, file$1, 26, 10, 3734);
    			attr_dev(a8, "href", "#/");
    			add_location(a8, file$1, 27, 14, 3779);
    			attr_dev(li10, "class", "svelte-1mcln6n");
    			add_location(li10, file$1, 27, 10, 3775);
    			attr_dev(ul1, "class", "svelte-1mcln6n");
    			add_location(ul1, file$1, 22, 8, 3609);
    			attr_dev(div2, "class", "company");
    			add_location(div2, file$1, 21, 6, 3579);
    			attr_dev(li11, "class", "svelte-1mcln6n");
    			add_location(li11, file$1, 32, 10, 3887);
    			attr_dev(a9, "href", "#");
    			add_location(a9, file$1, 33, 14, 3918);
    			attr_dev(li12, "class", "svelte-1mcln6n");
    			add_location(li12, file$1, 33, 10, 3914);
    			attr_dev(a10, "href", "#");
    			add_location(a10, file$1, 34, 14, 3961);
    			attr_dev(li13, "class", "svelte-1mcln6n");
    			add_location(li13, file$1, 34, 10, 3957);
    			attr_dev(a11, "href", "#");
    			add_location(a11, file$1, 35, 14, 4007);
    			attr_dev(li14, "class", "svelte-1mcln6n");
    			add_location(li14, file$1, 35, 10, 4003);
    			attr_dev(ul2, "class", "svelte-1mcln6n");
    			add_location(ul2, file$1, 31, 8, 3872);
    			attr_dev(div3, "class", "connect");
    			add_location(div3, file$1, 30, 6, 3842);
    			attr_dev(div4, "class", "footer-nav svelte-1mcln6n");
    			add_location(div4, file$1, 10, 4, 3221);
    			attr_dev(div5, "class", "footer-wrapper svelte-1mcln6n");
    			add_location(div5, file$1, 6, 2, 124);
    			attr_dev(a12, "href", "https://www.frontendmentor.io/challenges/blogr-landing-page-EX2RLAApP");
    			attr_dev(a12, "target", "_blank");
    			attr_dev(a12, "class", "svelte-1mcln6n");
    			add_location(a12, file$1, 42, 4, 4133);
    			attr_dev(a13, "href", "https://github.com/mattdavis06/Frontend-Mentor-Projects/tree/main/12.%20blogr-landing-page");
    			attr_dev(a13, "target", "_blank");
    			attr_dev(a13, "class", "svelte-1mcln6n");
    			add_location(a13, file$1, 47, 4, 4287);
    			attr_dev(a14, "href", "https://github.com/mattdavis06");
    			attr_dev(a14, "target", "_blank");
    			attr_dev(a14, "class", "svelte-1mcln6n");
    			add_location(a14, file$1, 53, 6, 4473);
    			attr_dev(div6, "class", "icon svelte-1mcln6n");
    			add_location(div6, file$1, 52, 4, 4448);
    			attr_dev(div7, "class", "attribution svelte-1mcln6n");
    			add_location(div7, file$1, 40, 2, 4086);
    			attr_dev(footer, "class", "svelte-1mcln6n");
    			add_location(footer, file$1, 5, 0, 113);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			append_dev(footer, div5);
    			append_dev(div5, div0);
    			append_dev(div0, svg);
    			append_dev(svg, path);
    			append_dev(div5, t0);
    			append_dev(div5, div4);
    			append_dev(div4, div1);
    			append_dev(div1, ul0);
    			append_dev(ul0, li0);
    			append_dev(ul0, t2);
    			append_dev(ul0, li1);
    			append_dev(li1, a0);
    			append_dev(ul0, t4);
    			append_dev(ul0, li2);
    			append_dev(li2, a1);
    			append_dev(ul0, t6);
    			append_dev(ul0, li3);
    			append_dev(li3, a2);
    			append_dev(ul0, t8);
    			append_dev(ul0, li4);
    			append_dev(li4, a3);
    			append_dev(ul0, t10);
    			append_dev(ul0, li5);
    			append_dev(li5, a4);
    			append_dev(div4, t12);
    			append_dev(div4, div2);
    			append_dev(div2, ul1);
    			append_dev(ul1, li6);
    			append_dev(ul1, t14);
    			append_dev(ul1, li7);
    			append_dev(li7, a5);
    			append_dev(ul1, t16);
    			append_dev(ul1, li8);
    			append_dev(li8, a6);
    			append_dev(ul1, t18);
    			append_dev(ul1, li9);
    			append_dev(li9, a7);
    			append_dev(ul1, t20);
    			append_dev(ul1, li10);
    			append_dev(li10, a8);
    			append_dev(div4, t22);
    			append_dev(div4, div3);
    			append_dev(div3, ul2);
    			append_dev(ul2, li11);
    			append_dev(ul2, t24);
    			append_dev(ul2, li12);
    			append_dev(li12, a9);
    			append_dev(ul2, t26);
    			append_dev(ul2, li13);
    			append_dev(li13, a10);
    			append_dev(ul2, t28);
    			append_dev(ul2, li14);
    			append_dev(li14, a11);
    			append_dev(footer, t30);
    			append_dev(footer, div7);
    			append_dev(div7, t31);
    			append_dev(div7, a12);
    			append_dev(div7, t33);
    			append_dev(div7, a13);
    			append_dev(div7, t35);
    			append_dev(div7, div6);
    			append_dev(div6, a14);
    			mount_component(fa, a14, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(fa.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(fa.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    			destroy_component(fa);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Fa, faGithub });
    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.46.4 */
    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let header;
    	let t0;
    	let main;
    	let sectionone;
    	let t1;
    	let mobilesection;
    	let t2;
    	let sectiontwo;
    	let t3;
    	let footer;
    	let current;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowresize*/ ctx[2]);
    	header = new Header({ $$inline: true });
    	sectionone = new SectionOne({ $$inline: true });
    	mobilesection = new MobileSection({ $$inline: true });
    	sectiontwo = new SectionTwo({ $$inline: true });
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(header.$$.fragment);
    			t0 = space();
    			main = element("main");
    			create_component(sectionone.$$.fragment);
    			t1 = space();
    			create_component(mobilesection.$$.fragment);
    			t2 = space();
    			create_component(sectiontwo.$$.fragment);
    			t3 = space();
    			create_component(footer.$$.fragment);
    			add_location(main, file, 30, 0, 660);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(header, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			mount_component(sectionone, main, null);
    			append_dev(main, t1);
    			mount_component(mobilesection, main, null);
    			append_dev(main, t2);
    			mount_component(sectiontwo, main, null);
    			insert_dev(target, t3, anchor);
    			mount_component(footer, target, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "resize", /*windowWidth*/ ctx[1], false, false, false),
    					listen_dev(window, "resize", /*onwindowresize*/ ctx[2])
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(sectionone.$$.fragment, local);
    			transition_in(mobilesection.$$.fragment, local);
    			transition_in(sectiontwo.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(sectionone.$$.fragment, local);
    			transition_out(mobilesection.$$.fragment, local);
    			transition_out(sectiontwo.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(header, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    			destroy_component(sectionone);
    			destroy_component(mobilesection);
    			destroy_component(sectiontwo);
    			if (detaching) detach_dev(t3);
    			destroy_component(footer, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let innerWidth;

    	function windowWidth() {
    		if (innerWidth > 900) {
    			windowSize.update(() => true);
    		} else {
    			windowSize.update(() => false);
    		}
    	}

    	onMount(() => {
    		windowWidth();
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function onwindowresize() {
    		$$invalidate(0, innerWidth = window.innerWidth);
    	}

    	$$self.$capture_state = () => ({
    		onMount,
    		windowSize,
    		Header,
    		SectionOne,
    		MobileSection,
    		SectionTwo,
    		Footer,
    		innerWidth,
    		windowWidth
    	});

    	$$self.$inject_state = $$props => {
    		if ('innerWidth' in $$props) $$invalidate(0, innerWidth = $$props.innerWidth);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [innerWidth, windowWidth, onwindowresize];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
      target: document.body,
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
