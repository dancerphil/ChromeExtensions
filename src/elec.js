const handleSetup = () => {
    const iframe = document.querySelector('#pxf-trade-auction-extranet');
    const iframeDocument = iframe.contentDocument;
    const d = iframeDocument;

    const styleElement = d.createElement('style');
    styleElement.innerText = '.el-table__header input, .el-table__body input { display: block; width: 50px; }';

    d.head.appendChild(styleElement);

    const actionContainer = [...d.querySelectorAll('.el-form-item')][1];
    const actionList = actionContainer.querySelector('.el-form-item__content');

    const tableHeader = d.querySelector('.el-table__header');
    const tableBody = d.querySelector('.el-table__body');

    const headerTrList = [...tableHeader.querySelectorAll('tr')];

    const trList = [...tableBody.querySelectorAll('tr')];

    const highlightRow = tr => {
        const tdList = [...tr.querySelectorAll('td')];
        const priceMinTd = tdList[2];
        const priceMaxTd = tdList[3];
        const buy1td = tdList[4];
        const sell1td = tdList[7];
        const buy1Span = buy1td.querySelector('span span');
        const sell1Span = sell1td.querySelector('span span');
        const priceMinElement = priceMinTd.querySelector('input');
        const priceMaxElement = priceMaxTd.querySelector('input');
        const priceMin = Number(priceMinElement.value);
        const buy1Value = Number(buy1Span?.innerText);
        const priceMax = Number(priceMaxElement.value);
        const sell1Value = Number(sell1Span?.innerText);

        // const shouldMinHighlight = priceMin > buy1Value;
        const shouldMinHighlight = priceMin > sell1Value;
        if (sell1Span) {
            sell1Span.style.background = shouldMinHighlight ? 'yellow' : 'unset';
        }
        const shouldMaxHighlight = priceMaxElement.value !== '' && priceMax < buy1Value;
        if (buy1Span) {
            buy1Span.style.background = shouldMaxHighlight ? 'yellow' : 'unset';
        }
    };

    const triggerHighlight = () => {
        trList.forEach(highlightRow);
    };

    const setupImportAction = () => {
        const fileInput = d.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.addEventListener('change', e => {
            const file = fileInput.files?.[0];
            if (!file) {
                return;
            }
            const reader = new FileReader();
            reader.onload = e => {
                const text = e.target.result;
                const data = text.split('\n').slice(1);
                const minInputList = [...tableBody.querySelectorAll('.min-input')];
                const maxInputList = [...tableBody.querySelectorAll('.max-input')];
                minInputList.forEach((_, i) => {
                    const minInput = minInputList[i];
                    const maxInput = maxInputList[i];
                    const value = data[i];
                    const valueList = value.split(',');
                    const minValue = (valueList[valueList.length - 2] ?? '').trim();
                    const maxValue = (valueList[valueList.length - 1] ?? '').trim();
                    minInput.value = minValue;
                    maxInput.value = maxValue;

                    triggerHighlight();
                });
            };
            reader.readAsText(file);
        });
        actionList.appendChild(fileInput);
    };

    const setupHeader = tr => {
        const thList = [...tr.querySelectorAll('th')];
        const buy1th = thList[2];

        const priceMinElement = d.createElement('input');
        const priceMaxElement = d.createElement('input');
        priceMinElement.addEventListener('change', e => {
            const value = e.target.value;
            const minInputList = [...tableBody.querySelectorAll('.min-input')];
            minInputList.forEach(input => input.value = value);
            triggerHighlight();
        });
        priceMaxElement.addEventListener('change', e => {
            const value = e.target.value;
            const maxInputList = [...tableBody.querySelectorAll('.max-input')];
            maxInputList.forEach(input => input.value = value);
            triggerHighlight();
        });
        const th1 = d.createElement('th');
        th1.append('买点');
        th1.append(priceMinElement);
        const th2 = d.createElement('th');
        th2.append('卖点');
        th2.append(priceMaxElement);
        tr.insertBefore(th1, buy1th);
        tr.insertBefore(th2, buy1th);
    };

    const setupRow = tr => {
        const tdList = [...tr.querySelectorAll('td')];
        const buy1td = tdList[2];

        const priceMinElement = d.createElement('input');
        priceMinElement.setAttribute('class', 'min-input');
        priceMinElement.addEventListener('change', triggerHighlight);
        const priceMaxElement = d.createElement('input');
        priceMaxElement.setAttribute('class', 'max-input');
        priceMaxElement.addEventListener('change', triggerHighlight);
        const td1 = d.createElement('td');
        td1.append(priceMinElement);
        const td2 = d.createElement('td');
        td2.append(priceMaxElement);
        tr.insertBefore(td1, buy1td);
        tr.insertBefore(td2, buy1td);
    };

    trList.forEach(setupRow);

    setupHeader(headerTrList[0]);

    setupImportAction();
};


if (window.self === window.top) {
    const setupEl = document.createElement('div');
    setupEl.innerText = '开始';
    setupEl.style = 'position: fixed; top: 0px; right: 0px;';
    setupEl.addEventListener('click', handleSetup);
    document.body.appendChild(setupEl);
}
