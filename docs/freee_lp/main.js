document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = document.body.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });
  }

  const scrollButtons = document.querySelectorAll('[data-scroll]');
  scrollButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-scroll');
      if (!target) return;

      if (target === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const section = document.getElementById(target);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      if (document.body.classList.contains('menu-open')) {
        document.body.classList.remove('menu-open');
        menuToggle?.setAttribute('aria-expanded', 'false');
        mobileMenu?.setAttribute('aria-hidden', 'true');
      }
    });
  });

  const targetToggle = document.querySelector('[data-target-toggle]');
  const targetButtons = document.querySelectorAll('[data-target-switch]');
  const targetPanels = document.querySelectorAll('[data-target-panel]');

  const setTarget = (target) => {
    if (targetToggle) {
      targetToggle.setAttribute('data-active', target);
    }
    targetButtons.forEach((button) => {
      button.classList.toggle('is-active', button.getAttribute('data-target-switch') === target);
    });
    targetPanels.forEach((panel) => {
      panel.classList.toggle('is-active', panel.getAttribute('data-target-panel') === target);
    });
  };

  targetButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-target-switch');
      if (target) {
        setTarget(target);
      }
    });
  });

  if (targetToggle) {
    const initialTarget = targetToggle.getAttribute('data-active') || 'new';
    setTarget(initialTarget);
  }

  const planButtons = document.querySelectorAll('[data-plan]');
  const planPanels = document.querySelectorAll('[data-plan-content]');

  const setPlan = (plan) => {
    planButtons.forEach((button) => {
      button.classList.toggle('is-active', button.getAttribute('data-plan') === plan);
    });
    planPanels.forEach((panel) => {
      panel.classList.toggle('is-active', panel.getAttribute('data-plan-content') === plan);
    });
  };

  planButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const plan = button.getAttribute('data-plan');
      if (plan) {
        setPlan(plan);
      }
    });
  });

  const initialPlan = document.querySelector('.plan-tab.is-active')?.getAttribute('data-plan') || 'A';
  setPlan(initialPlan);

  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach((item) => {
    const trigger = item.querySelector('[data-accordion-trigger]');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      accordionItems.forEach((panel) => panel.classList.remove('is-open'));
      if (!isOpen) {
        item.classList.add('is-open');
      }
    });
  });

  const contactForm = document.querySelector('[data-contact-form]');
  const contactSuccess = document.querySelector('[data-contact-success]');
  const contactReset = document.querySelector('[data-contact-reset]');

  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      contactForm.style.display = 'none';
      contactSuccess.style.display = 'block';
    });
  }

  if (contactReset && contactForm && contactSuccess) {
    contactReset.addEventListener('click', () => {
      contactSuccess.style.display = 'none';
      contactForm.style.display = 'grid';
    });
  }

  const pricingSelector = document.querySelector('[data-pricing-selector]');
  const pricingCard = document.querySelector('[data-pricing-card]');

  if (pricingSelector && pricingCard) {
    const serviceInputs = pricingSelector.querySelectorAll('input[name="pricing-service"]');
    const salesSelect = pricingSelector.querySelector('[data-pricing-sales]');
    const salesNote = pricingSelector.querySelector('[data-pricing-sales-note]');
    const hoursWrap = pricingSelector.querySelector('[data-pricing-hours]');
    const hoursInput = pricingSelector.querySelector('[data-pricing-hours-input]');
    const tagEl = pricingCard.querySelector('[data-pricing-tag]');
    const nameEl = pricingCard.querySelector('[data-pricing-name]');
    const descEl = pricingCard.querySelector('[data-pricing-desc]');
    const priceEl = pricingCard.querySelector('[data-pricing-price]');
    const unitEl = pricingCard.querySelector('[data-pricing-unit]');
    const pointsEl = pricingCard.querySelector('[data-pricing-points]');
    const noteEl = pricingCard.querySelector('[data-pricing-note]');
    const breakdownEl = pricingCard.querySelector('[data-pricing-breakdown]');
    const regularEl = pricingCard.querySelector('[data-pricing-regular]');
    const discountEl = pricingCard.querySelector('[data-pricing-discount]');
    const regularNoteEl = pricingCard.querySelector('[data-pricing-regular-note]');
    const discountNoteEl = pricingCard.querySelector('[data-pricing-discount-note]');
    const liteToggle = pricingCard.querySelector('[data-pricing-lite-toggle]');
    const liteCheckbox = pricingCard.querySelector('[data-pricing-lite-checkbox]');
    const litePanel = pricingCard.querySelector('[data-pricing-lite]');
    const consultButton = pricingCard.querySelector('[data-pricing-consult]');
    const simButton = pricingCard.querySelector('[data-pricing-sim]');

    const pricingData = {
      defense: {
        tag: '守り',
        tagClass: 'defense',
        name: '経営顧問',
        description: '資金繰り・銀行格付・投資計画を年次で設計し、月次で運用する顧問です。',
        unit: '/月',
        points: [
          '年次資金/投資計画を設計',
          '融資・補助金ロードマップ運用',
          '銀行格付KPIのモニタリング',
        ],
        prices: {
          under_50m: { price: '要相談', unit: '', note: '対象目安は年商5,000万円以上です。' },
          '50m_100m': { price: '5万円', note: '年商5,000万円〜1億円' },
          '100m_500m': { price: '10万円', note: '〜5億円' },
          '500m_1b': { price: '15万円', note: '〜10億円' },
          '1b_3b': { price: '20万円', note: '〜30億円' },
        },
      },
      offense: {
        tag: '攻め',
        tagClass: 'offense',
        name: '補助金顧問（本格）',
        description: '補助金を毎回の“運”ではなく、年間で取りに行く顧問サービスです。',
        unit: '/月',
        points: [
          '年次ロードマップを設計',
          '最低支援額の撤廃',
          '実績報告費用は無料',
        ],
        prices: {
          under_50m: { price: '3万円', note: '年商5,000万円以下も月額3万円で統一' },
          '50m_100m': { price: '3万円', note: '年商5億円以下' },
          '100m_500m': { price: '3万円', note: '年商5億円以下' },
          '500m_1b': { price: '5万円', note: '年商5億円超' },
          '1b_3b': { price: '5万円', note: '年商5億円超' },
        },
      },
      foundation: {
        tag: '土台',
        tagClass: 'foundation',
        name: 'BPOサービス',
        description: '証憑・数値・資料化を整え、守りと攻めの両方を支える土台です。',
        unit: '/時',
        points: [
          '15分単位の時間課金',
          '月次試算表・資金繰りを整備',
          '顧問加入で20%優遇',
        ],
        prices: {
          default: { price: '4,000円', unit: '/時', note: '顧問加入時は優遇単価があります（詳細は全体説明）。' },
        },
        salesNote: 'BPOは年商に関わらず時間課金です。時間数を入力してください。',
      },
    };

    const formatYen = (value) => value.toLocaleString('ja-JP');

    const renderPricing = () => {
      const selectedService = pricingSelector.querySelector('input[name="pricing-service"]:checked')?.value || 'defense';
      const salesValue = salesSelect?.value || '50m_100m';
      const data = pricingData[selectedService];
      if (!data) return;

      const isFoundation = selectedService === 'foundation';
      if (hoursWrap) {
        hoursWrap.hidden = !isFoundation;
      }

      if (tagEl) {
        tagEl.textContent = data.tag;
        tagEl.className = `pricing-tag ${data.tagClass}`;
      }
      if (nameEl) nameEl.textContent = data.name;
      if (descEl) descEl.textContent = data.description;
      if (pointsEl) {
        pointsEl.innerHTML = data.points.map((point) => `<li>${point}</li>`).join('');
      }
      if (salesNote) {
        salesNote.textContent = data.salesNote || '年商は目安のレンジを選択してください。';
      }

      if (simButton) {
        simButton.hidden = false;
        simButton.setAttribute('data-sim-default', isFoundation ? 'B' : 'A');
      }

      if (isFoundation) {
        const hoursRaw = parseFloat(hoursInput?.value || '');
        const hours = Number.isFinite(hoursRaw) && hoursRaw > 0 ? hoursRaw : 5;
        if (hoursInput && `${hours}` !== hoursInput.value) {
          hoursInput.value = hours;
        }
        const normalRate = 4000;
        const discountRate = 3200;
        const totalNormal = Math.round(hours * normalRate);
        const totalDiscount = Math.round(hours * discountRate);

        if (priceEl) priceEl.textContent = `${formatYen(totalNormal)}円`;
        if (unitEl) {
          unitEl.textContent = '/月';
          unitEl.style.display = 'inline';
        }
        if (breakdownEl) breakdownEl.hidden = false;
        if (regularEl) regularEl.textContent = `${formatYen(totalNormal)}円`;
        if (discountEl) discountEl.textContent = `${formatYen(totalDiscount)}円`;
        if (regularNoteEl) regularNoteEl.textContent = `4,000円/時 × ${hours}h`;
        if (discountNoteEl) discountNoteEl.textContent = `3,200円/時 × ${hours}h`;
        if (noteEl) noteEl.textContent = `月${hours}hの場合の料金目安です。`;
        if (liteToggle) liteToggle.hidden = true;
        if (litePanel) litePanel.hidden = true;
        if (liteCheckbox) liteCheckbox.checked = false;
        if (consultButton) consultButton.hidden = true;
      } else {
        const isOffense = selectedService === 'offense';
        const priceItem = data.prices[salesValue] || data.prices.default;
        if (!priceItem) return;
        if (priceEl) priceEl.textContent = priceItem.price;
        if (unitEl) {
          const unitText = priceItem.unit ?? data.unit ?? '';
          unitEl.textContent = unitText;
          unitEl.style.display = unitText ? 'inline' : 'none';
        }
        if (noteEl) {
          const note = [priceItem.note, data.extraNote].filter(Boolean).join(' ');
          noteEl.textContent = note;
        }
        if (breakdownEl) breakdownEl.hidden = true;
        if (liteToggle) liteToggle.hidden = !isOffense;
        if (litePanel) litePanel.hidden = !isOffense || !liteCheckbox?.checked;
        if (!isOffense && liteCheckbox) liteCheckbox.checked = false;
        if (consultButton) consultButton.hidden = true;
      }
    };

    serviceInputs.forEach((input) => {
      input.addEventListener('change', renderPricing);
    });
    salesSelect?.addEventListener('change', renderPricing);
    hoursInput?.addEventListener('input', renderPricing);
    liteCheckbox?.addEventListener('change', renderPricing);
    renderPricing();
  }

  let setSimPlan = null;
  const simForm = document.querySelector('[data-subsidy-sim]');
  if (simForm) {
    const planInputs = simForm.querySelectorAll('input[name="sim-plan"]');
    const amountInput = simForm.querySelector('[data-sim-amount]');
    const rateSelect = simForm.querySelector('[data-sim-rate]');
    const upfrontEl = document.querySelector('[data-sim-upfront]');
    const feeEl = document.querySelector('[data-sim-fee]');
    const totalEl = document.querySelector('[data-sim-total]');
    const noteEl = document.querySelector('[data-sim-note]');
    const detailsEl = document.querySelector('[data-sim-details]');
    const spotLabelEl = document.querySelector('[data-sim-spot-label]');
    const spotEl = document.querySelector('[data-sim-spot]');
    const diffEl = document.querySelector('[data-sim-diff]');
    const compareEl = document.querySelector('[data-sim-compare]');

    const simPlans = {
      A: {
        label: '顧問セット',
        upfront: 0,
        upfrontLabel: '0円',
        rates: [7.5, 10],
        details: [
          '前提: 経営顧問 6ヶ月以上',
          '支援範囲: 全面支援＋実行・報告のフル伴走',
        ],
      },
      B: {
        label: 'BPOセット',
        upfront: 0,
        upfrontLabel: '0円',
        rates: [15, 20],
        details: [
          '前提: BPO 最低5h/月',
          '支援範囲: 体制整備→申請、初回実績報告まで標準対応',
        ],
      },
      L: {
        label: '補助金顧問Lite',
        upfront: 0,
        upfrontLabel: '0円',
        rates: [15, 20],
        details: [
          '前提: 補助金顧問Lite（月額8,000円）加入',
          '支援範囲: 申請準備の入口支援＋案件化で申請支援へ',
        ],
      },
      S: {
        label: 'スポット',
        upfront: 100000,
        upfrontLabel: '10万円〜',
        rates: [20, 30],
        details: [
          '前提: 月2件上限',
          '支援範囲: 添削中心、採択後支援は原則なし',
        ],
        upfrontIsRange: true,
      },
    };

    const formatYen = (value) => value.toLocaleString('ja-JP');
    const formatDiff = (value) => {
      const sign = value >= 0 ? '+' : '-';
      return `${sign}${formatYen(Math.abs(value))}円`;
    };

    const updateRateOptions = (planKey) => {
      const plan = simPlans[planKey];
      if (!plan || !rateSelect) return;
      rateSelect.innerHTML = '';
      plan.rates.forEach((rate) => {
        const option = document.createElement('option');
        option.value = rate;
        option.textContent = `${rate}%`;
        rateSelect.appendChild(option);
      });
    };

    const renderSimulation = () => {
      const planKey = simForm.querySelector('input[name="sim-plan"]:checked')?.value || 'A';
      const plan = simPlans[planKey];
      if (!plan) return;
      const isSpot = planKey === 'S';
      if (rateSelect && rateSelect.options.length === 0) {
        updateRateOptions(planKey);
      }

      const amountRaw = parseFloat(amountInput?.value || '');
      const amount = Number.isFinite(amountRaw) && amountRaw > 0 ? amountRaw : 0;
      const rate = parseFloat(rateSelect?.value || plan.rates[0]);
      const fee = Math.round(amount * (rate / 100));
      const total = plan.upfront + fee;
      const spotPlan = simPlans.S;
      const spotRate = rate === 7.5 || rate === 15 ? 20 : 30;
      const spotTotal = spotPlan.upfront + Math.round(amount * (spotRate / 100));
      const diff = spotTotal - total;

      if (upfrontEl) upfrontEl.textContent = plan.upfrontLabel || `${formatYen(plan.upfront)}円`;
      if (feeEl) feeEl.textContent = `${formatYen(fee)}円`;
      if (totalEl) {
        totalEl.textContent = plan.upfrontIsRange ? `${formatYen(total)}円〜` : `${formatYen(total)}円`;
      }
      if (noteEl) {
        const amountLabel = amount > 0 ? `${formatYen(amount)}円` : '補助金額';
        noteEl.textContent = `${amountLabel} × ${rate}% の成功報酬で計算しています。`;
      }
      if (detailsEl) {
        detailsEl.innerHTML = plan.details.map((item) => `<li>${item}</li>`).join('');
      }
      if (compareEl) compareEl.hidden = isSpot;
      if (!isSpot) {
        if (spotLabelEl) spotLabelEl.textContent = `スポット合計（${spotRate}%）`;
        if (spotEl) spotEl.textContent = `${formatYen(spotTotal)}円`;
        if (diffEl) diffEl.textContent = `${formatDiff(diff)}`;
      }
    };

    planInputs.forEach((input) => {
      input.addEventListener('change', () => {
        updateRateOptions(input.value);
        renderSimulation();
      });
    });
    rateSelect?.addEventListener('change', renderSimulation);
    amountInput?.addEventListener('input', renderSimulation);
    updateRateOptions('A');
    renderSimulation();

    setSimPlan = (planKey) => {
      const targetInput = simForm.querySelector(`input[name="sim-plan"][value="${planKey}"]`);
      if (targetInput) {
        targetInput.checked = true;
        updateRateOptions(planKey);
        renderSimulation();
      }
    };
  }

  const lightboxes = Array.from(document.querySelectorAll('[data-lightbox]'));
  const lightboxTriggers = document.querySelectorAll('[data-lightbox-trigger]');
  const lightboxCloseButtons = document.querySelectorAll('[data-lightbox-close]');

  const closeLightbox = (lightbox) => {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
  };

  const openLightbox = (key) => {
    lightboxes.forEach((lightbox) => closeLightbox(lightbox));
    const target = lightboxes.find((box) => (box.getAttribute('data-lightbox') || 'default') === (key || 'default')) || lightboxes[0];
    if (!target) return;
    target.classList.add('is-open');
    target.setAttribute('aria-hidden', 'false');
  };

  lightboxTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const targetKey = trigger.getAttribute('data-lightbox-trigger');
      if (targetKey === 'subsidy-sim' && typeof setSimPlan === 'function') {
        const defaultPlan = trigger.getAttribute('data-sim-default') || 'A';
        setSimPlan(defaultPlan);
      }
      openLightbox(targetKey);
    });
  });

  lightboxCloseButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const parentLightbox = button.closest('[data-lightbox]');
      closeLightbox(parentLightbox);
    });
  });

  lightboxes.forEach((lightbox) => {
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        closeLightbox(lightbox);
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      lightboxes.forEach((lightbox) => closeLightbox(lightbox));
    }
  });

  const initRiskMarquee = (marquee) => {
    const inner = marquee.querySelector('.risk-marquee-inner');
    const tracks = marquee.querySelectorAll('.risk-track');
    if (!inner || tracks.length < 2) return;

    let trackWidth = 0;
    let maxScroll = 0;
    let isDragging = false;
    let isLocked = false;
    let startX = 0;
    let startScrollLeft = 0;
    let touchStartY = null;
    let holdRemaining = 0;
    const activationHold = 80;

    const updateTrackWidth = () => {
      trackWidth = tracks[0].getBoundingClientRect().width;
      maxScroll = Math.max(0, trackWidth - marquee.clientWidth);
      marquee.scrollLeft = Math.min(Math.max(marquee.scrollLeft, 0), maxScroll);
    };

    const clampScroll = (value) => Math.min(Math.max(value, 0), maxScroll);

    const inActiveZone = () => {
      const rect = marquee.getBoundingClientRect();
      const centerLine = window.innerHeight * 0.5;
      const rectCenter = rect.top + rect.height / 2;
      return Math.abs(rectCenter - centerLine) <= 120;
    };

    const onWheel = (event) => {
      if (isDragging) return;
      const deltaY = event.deltaY;
      const atStart = marquee.scrollLeft <= 0;
      const atEnd = marquee.scrollLeft >= maxScroll - 1;

      if (isLocked && ((deltaY > 0 && atEnd) || (deltaY < 0 && atStart))) {
        isLocked = false;
        holdRemaining = 0;
        return;
      }

      if (!isLocked && (!inActiveZone() || maxScroll <= 0)) {
        return;
      }

      if (!isLocked && ((deltaY > 0 && atEnd) || (deltaY < 0 && atStart))) {
        return;
      }

      if (!isLocked) {
        isLocked = true;
        holdRemaining = activationHold;
      }
      event.preventDefault();
      if (holdRemaining > 0) {
        holdRemaining -= Math.abs(deltaY);
        return;
      }
      const speed = 0.5;
      marquee.scrollLeft = clampScroll(marquee.scrollLeft + deltaY * speed);

      const reachedStart = marquee.scrollLeft <= 0;
      const reachedEnd = marquee.scrollLeft >= maxScroll - 1;
      if ((deltaY > 0 && reachedEnd) || (deltaY < 0 && reachedStart)) {
        isLocked = false;
        holdRemaining = 0;
      }
    };

    const onTouchStart = (event) => {
      if (event.touches.length !== 1) return;
      touchStartY = event.touches[0].clientY;
    };

    const onTouchMove = (event) => {
      if (touchStartY === null || event.touches.length !== 1) return;
      const currentY = event.touches[0].clientY;
      const deltaY = touchStartY - currentY;
      const atStart = marquee.scrollLeft <= 0;
      const atEnd = marquee.scrollLeft >= maxScroll - 1;

      if (isLocked && ((deltaY > 0 && atEnd) || (deltaY < 0 && atStart))) {
        isLocked = false;
        holdRemaining = 0;
        touchStartY = currentY;
        return;
      }

      if (!isLocked && (!inActiveZone() || maxScroll <= 0)) {
        touchStartY = currentY;
        return;
      }

      if (!isLocked && ((deltaY > 0 && atEnd) || (deltaY < 0 && atStart))) {
        touchStartY = currentY;
        return;
      }

      if (!isLocked) {
        isLocked = true;
        holdRemaining = activationHold;
      }
      event.preventDefault();
      if (holdRemaining > 0) {
        holdRemaining -= Math.abs(deltaY);
        touchStartY = currentY;
        return;
      }
      const speed = 0.5;
      marquee.scrollLeft = clampScroll(marquee.scrollLeft + deltaY * speed);

      const reachedStart = marquee.scrollLeft <= 0;
      const reachedEnd = marquee.scrollLeft >= maxScroll - 1;
      if ((deltaY > 0 && reachedEnd) || (deltaY < 0 && reachedStart)) {
        isLocked = false;
        holdRemaining = 0;
      }
      touchStartY = currentY;
    };

    const onTouchEnd = () => {
      touchStartY = null;
    };

    updateTrackWidth();
    marquee.scrollLeft = 0;

    marquee.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      isDragging = true;
      marquee.classList.add('is-dragging');
      startX = event.clientX;
      startScrollLeft = marquee.scrollLeft;
      marquee.setPointerCapture?.(event.pointerId);
    });

    marquee.addEventListener('pointermove', (event) => {
      if (!isDragging) return;
      if (event.pointerType === 'mouse' && event.cancelable) {
        event.preventDefault();
      }
      const delta = event.clientX - startX;
      marquee.scrollLeft = clampScroll(startScrollLeft - delta);
    });

    const endDrag = (event) => {
      if (!isDragging) return;
      isDragging = false;
      marquee.classList.remove('is-dragging');
      marquee.releasePointerCapture?.(event.pointerId);
    };

    marquee.addEventListener('pointerup', endDrag);
    marquee.addEventListener('pointerleave', endDrag);
    marquee.addEventListener('pointercancel', endDrag);

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });
    window.addEventListener('resize', updateTrackWidth);
  };

  document.querySelectorAll('[data-marquee]').forEach((marquee) => {
    initRiskMarquee(marquee);
  });

  const revealItems = document.querySelectorAll('.reveal');
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  if (!prefersReducedMotion) {
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * -8;
        const rotateY = ((x / rect.width) - 0.5) * 8;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  const initHeroBackground = () => {
    const container = document.getElementById('hero-three');
    if (!container || !window.THREE || prefersReducedMotion) return;

    const getSize = () => ({
      width: container.clientWidth || window.innerWidth,
      height: container.clientHeight || window.innerHeight,
    });

    const { width, height } = getSize();
    const scene = new window.THREE.Scene();
    scene.fog = new window.THREE.FogExp2(0x0f172a, 0.002);
    scene.background = new window.THREE.Color(0x0f172a);

    const camera = new window.THREE.PerspectiveCamera(75, width / height, 0.1, 2000);
    camera.position.z = 100;

    const renderer = new window.THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const particleCount = 600;
    const geometry = new window.THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const palette = [
      new window.THREE.Color(0x3b82f6),
      new window.THREE.Color(0x60a5fa),
      new window.THREE.Color(0xfacc15),
    ];

    for (let i = 0; i < particleCount; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 40 + Math.random() * 100;
      const z = (Math.random() - 0.5) * 2000;
      positions.push(Math.cos(angle) * radius, Math.sin(angle) * radius, z);
      const color = palette[Math.floor(Math.random() * palette.length)];
      colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute('position', new window.THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new window.THREE.Float32BufferAttribute(colors, 3));

    const material = new window.THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: window.THREE.AdditiveBlending,
    });

    const points = new window.THREE.Points(geometry, material);
    scene.add(points);

    let mouseX = 0;
    let mouseY = 0;
    let targetZ = 0;

    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      targetZ = window.scrollY * 0.4;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll);

    const animate = () => {
      camera.position.z += (targetZ + 100 - camera.position.z) * 0.05;
      camera.rotation.x += (-mouseY * 0.1 - camera.rotation.x) * 0.05;
      camera.rotation.y += (-mouseX * 0.1 - camera.rotation.y) * 0.05;
      points.rotation.z += 0.001;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', () => {
      const size = getSize();
      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();
      renderer.setSize(size.width, size.height);
    });
  };

  const initMorphingParticles = () => {
    const container = document.getElementById('solution-three');
    if (!container || !window.THREE || prefersReducedMotion) return;

    const getSize = () => ({
      width: container.clientWidth || window.innerWidth,
      height: container.clientHeight || window.innerHeight,
    });

    const { width, height } = getSize();
    const scene = new window.THREE.Scene();
    const camera = new window.THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new window.THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const particleCount = 1200;
    const geometry = new window.THREE.BufferGeometry();
    const initialPositions = [];
    const targetPositions = [];

    for (let i = 0; i < particleCount; i += 1) {
      initialPositions.push(
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      );
    }

    const radius = 35;
    for (let i = 0; i < particleCount; i += 1) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      targetPositions.push(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );
    }

    const currentPositions = new Float32Array(initialPositions);
    geometry.setAttribute('position', new window.THREE.BufferAttribute(currentPositions, 3));

    const material = new window.THREE.PointsMaterial({
      color: 0x3b82f6,
      size: 0.6,
      transparent: true,
      opacity: 0.75,
    });

    const particles = new window.THREE.Points(geometry, material);
    scene.add(particles);

    let time = 0;
    const animate = () => {
      time += 0.01;
      particles.rotation.y += 0.002;
      particles.rotation.x += 0.001;

      const morphFactor = (Math.sin(time) + 1) / 2;
      const positions = particles.geometry.attributes.position.array;

      for (let i = 0; i < particleCount; i += 1) {
        const ix = i * 3;
        positions[ix] = initialPositions[ix] * (1 - morphFactor) + targetPositions[ix] * morphFactor;
        positions[ix + 1] = initialPositions[ix + 1] * (1 - morphFactor) + targetPositions[ix + 1] * morphFactor;
        positions[ix + 2] = initialPositions[ix + 2] * (1 - morphFactor) + targetPositions[ix + 2] * morphFactor;
      }

      particles.geometry.attributes.position.needsUpdate = true;
      const colorShift = 0.2 + morphFactor * 0.4;
      material.color.setRGB(colorShift, 0.5, 1.0);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', () => {
      const size = getSize();
      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();
      renderer.setSize(size.width, size.height);
    });
  };

  initHeroBackground();
  initMorphingParticles();
});
