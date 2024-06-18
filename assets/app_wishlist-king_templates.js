const templates = [
  {
    id: "wishlist-link",
    data: "wishlist",
    template: `
      <style>.wishlist-king-temp{display:none;}</style>
      <a href="{{ wishlist.url }}" class="nav-link hide-tablet w-inline-block" title="{{ locale.view_wishlist }}">
        <div>{% include "wishlist-icon" %}</div>
        {% if wishlist.item_count > 0 %}<span class="favorite_link-count">{{ wishlist.item_count }}</span>{% endif %}
      </a>
      
    `,
  },
  {
    id: "wishlist-link-mobile",
    data: "wishlist",
    template: `
      <style>.wishlist-king-temp{display:none;}</style>
      <a href="{{ wishlist.url }}" class="nav-link is-mobile-bar w-inline-block" title="{{ locale.view_wishlist }}">
        <div>{% include "wishlist-icon" %}</div>
      </a>
      
    `,
  },
  {
    id: "wishlist-button",
    data: "product",
    events: {
      "click button[data-wk-add-product]": (event) => {
        event.preventDefault();
        event.stopPropagation();

        const variantInput = document.querySelector("form *[name='id']");
        const variantId = variantInput ? variantInput.value : undefined;

        WishlistKing.toolkit.addProduct(
          event.currentTarget.getAttribute("data-wk-add-product"),
          variantId
        );
      },
      "click button[data-wk-remove-product]": (event) => {
        event.preventDefault();
        event.stopPropagation();

        WishlistKing.toolkit.removeProduct(
          event.currentTarget.getAttribute("data-wk-remove-product")
        );
      },
      "click button[data-wk-remove-item]": (event) => {
        event.preventDefault();
        event.stopPropagation();

        WishlistKing.toolkit.removeItem(
          event.currentTarget.getAttribute("data-wk-remove-item")
        );
      },
    },
    template: `
      {% if product.in_wishlist %}
        {% assign btn_title = locale.remove_from_wishlist %}
        {% assign btn_action = 'remove' %}
        {% assign btn_class = 'is-filled' %}
      {% else %}
        {% assign btn_title = locale.add_to_wishlist %}
        {% assign btn_action = 'add' %}
        {% assign btn_class = '' %}
      {% endif %}

      {% assign scope = "product" %}
      {% assign targetId = product.id %}
      {% assign icon_name = "wishlist-icon" %}

      {% if itemId %}
      {% assign scope = "item" %}
      {% assign targetId = itemId %}
      {% assign icon_name = "remove-icon" %}
      {% endif %}

      <button type="button" class="favorite is-product-page {{ btn_class }} {{ addClass }}" title="{{ btn_title }}" data-wk-{{ btn_action }}-{{ scope }}="{{ targetId }}">
      </button>
    `,
  },
  {
    id: "wishlist-button-list",
    data: "product",
    events: {
      "click button[data-wk-add-product]": (event) => {
        event.preventDefault();
        event.stopPropagation();

        const variantInput = document.querySelector("form *[name='id']");
        const variantId = variantInput ? variantInput.value : undefined;

        WishlistKing.toolkit.addProduct(
          event.currentTarget.getAttribute("data-wk-add-product"),
          variantId
        );
      },
      "click button[data-wk-remove-product]": (event) => {
        event.preventDefault();
        event.stopPropagation();

        WishlistKing.toolkit.removeProduct(
          event.currentTarget.getAttribute("data-wk-remove-product")
        );
      },
      "click button[data-wk-remove-item]": (event) => {
        event.preventDefault();
        event.stopPropagation();

        WishlistKing.toolkit.removeItem(
          event.currentTarget.getAttribute("data-wk-remove-item")
        );
      },
    },
    template: `
      {% if product.in_wishlist %}
        {% assign btn_title = locale.remove_from_wishlist %}
        {% assign btn_action = 'remove' %}
        {% assign btn_class = 'is-filled' %}
      {% else %}
        {% assign btn_title = locale.add_to_wishlist %}
        {% assign btn_action = 'add' %}
        {% assign btn_class = '' %}
      {% endif %}

      {% assign scope = "product" %}
      {% assign targetId = product.id %}
      {% assign icon_name = "wishlist-icon" %}

      {% if itemId %}
      {% assign scope = "item" %}
      {% assign targetId = itemId %}
      {% assign icon_name = "remove-icon" %}
      {% endif %}

      <button type="button" class="favorite {{ btn_class }} {{ addClass }}" title="{{ btn_title }}" data-wk-{{ btn_action }}-{{ scope }}="{{ targetId }}">
      </button>
    `,
  },
  {
    id: "wishlist-page",
    data: "wishlist",
    events: {
      "click a[data-wk-share]": (event) => {
        event.preventDefault();
        event.stopPropagation();

        WishlistKing.toolkit.requestWishlistSharing({
          wkShareService: event.currentTarget.getAttribute(
            "data-wk-share-service"
          ),
          wkShare: event.currentTarget.getAttribute("data-wk-share"),
          wkShareImage: event.currentTarget.getAttribute("data-wk-share-image"),
        });
      },
    },
    template: `
    <div class='wk-page {% if wishlist.read_only %}wk-page--shared{% endif %}'>
    <div class="favorites_shareonsocial">
                <div class="heading-xs text-style-sans hide-mobile-portrait">SHARE</div>
                {% include "wishlist-share-button-fb" %}
                {% include "wishlist-share-button-twitter" %}
                {% include "wishlist-share-button-email" %}
                {% include "wishlist-share-button-link" %}
                
                <div class="view-switcher-layout">
                    <div class="text-tag">view:</div>
                    <div class="hidden w-embed"></div>
                    <a href="#" class="view-switcher_grid w-inline-block"></a>
                    <a href="#" class="view-switcher_col w-inline-block"></a>
                </div>
            </div>
            
            {% if wishlist.item_count == 0 %}
            <p class="margin-vertical margin-huge text-style-sans opacity50 text-align-center" >You haven't saved any favorites.</p>
            {% else %}

            <div class="list_wrapper">
              <div>
                <div class="list_layout is-4-col">
                {% assign products = wishlist.products | reverse %}
                  {% for product in products %}
                  <div
                    class="list_item-wrapper of-4 w-inline-block">
                    <div class="list_item-layout">
                      
                    {% assign variant = product.selected_or_first_available_variant %}
                    <div style="background-color:var(--medium);" class="list_item-visual-content">
                    <a href="{{ product.url }}" class="img-portrait-sm" alt="{{ product.title }}">
                    <img srcset="{{ product | img_url: '400x' }} 400w" loading="lazy" alt="{{ product.title }}" class="img-base">
                      {% if variant.compare_at_price %}
                      <div class="list_item-tag">
                        <div>Sale</div>
                      </div>
                      {% endif %}
                    </a>
                    <a href="{{product.url }}" name="{{ product.title }}" alt="{{ product.title }}" class="img-overlay">
                    
                      <div buttons-product-id="{{ product.id }}" class="list_item-overlay-button-wrapper">
                      
                      
                                    <div class="product-form__buttons flex-grow">
                                   
                                    
                                    </div>
                                    
                        
                        
                        {% unless wishlist.read_only %}
                            {% include "wishlist-button-list" itemId: product.wishlist_item_id %}
                        {% else %}
                            {% include "wishlist-button-list" product: product %}
                        {% endunless %}
                      </div>
                    </a>
                  </div>



                      <div class="list_item-info">
                        <div class="list_item-header-wrapper is-price-btm">

                          <a class="list_item-title" href="{{ product.url }}">

                            <div class="text-item text-style-1lines">{{product.title}}

                            </div>

                          </a>
                          
                          
                        </div>
                      </div>
                    </div>
                  </div>
                  {% endfor %}
                </div>
              </div>
              
            </div>
            
          {% endif %}      
          </div>
    `,
  },
  {
    id: "wishlist-page-shared",
    data: "shared_wishlist",
    template: `
      {% assign wishlist = shared_wishlist %}
      {% include "wishlist-page" with wishlist %}
    `,
  },
  {
    id: "wishlist-product-form",
    events: {
      "render .wk-product-form": (form) => {
        const container = form.closest("[data-wk-item]");
        const itemId = container.getAttribute("data-wk-item");
        WishlistKing.toolkit.getItem(itemId).then((product) => {
          WishlistKing.toolkit.initProductForm(form, product, {
            // NOTE: Uncomment to override default option change
            // onOptionChange: (event) => {
            //   console.log(event.dataset);
            // },
            // NOTE: Uncomment to override default form submit
            // onFormSubmit: (event) => {
            //   event.preventDefault();
            //   event.stopPropagation();
            // },
          });
        });
      },
    },
    template: `
      <form class="wk-product-form" action="/cart/add" method="post">
        {% assign current_variant = product.selected_or_first_available_variant %}
        <div class="wk-product-form__options">
          <input name="id" value="{{ current_variant.id }}" type="hidden">
          {% unless product.has_only_default_variant %}
            {% for option in product.options_with_values %}
              <div class="wk-product-form__option">
                <label class="wk-product-form__option__label" for="Option{{ option.position }}">
                  {{ option.name }}
                </label>
                <select class="wk-product-form__option__select" name="options[{{ option.name | escape }}]">
                  {% for value in option.values %}
                    <option value="{{ value | escape }}" {% if option.selected_value == value %}selected="selected"{% endif %} {% if option.soldout_values contains value %}disabled{% endif %}>
                      {{ value }}
                    </option>
                  {% endfor %}
                </select>
              </div>
            {% endfor %}
          {% endunless %}
          {% comment %}
          <div class="wk-product-form__quantity">
            <label class="wk-product-form__quantity__label" for="Quantity">{{ locale.quantity }}</label>
            <input class="wk-product-form__quantity__input" type="number" name="quantity" value="1" min="1">
          </div>
          {% endcomment %}
        </div>
        <button type="submit" class="wk-product-form__submit" data-wk-add-to-cart="{{ product.wishlist_item_id }}" {% unless current_variant.available %}disabled{% endunless %}>
          {% if current_variant.available %}{{ locale.add_to_cart }}{% else %}{{ locale.sold_out }}{% endif %}
        </button>
      </form>
    `,
  },
  {
    id: "wishlist-button-bulk-add-to-cart",
    data: "wishlist",
    events: {
      "click button[data-wk-bulk-add-to-cart]": (event) => {
        WishlistKing.toolkit.requestAddAllToCart(
          event.currentTarget.getAttribute("data-wk-bulk-add-to-cart")
        );
      },
    },
    template: `
      {% assign btn_text = locale.add_all_to_cart %}
      {% assign btn_title = locale.add_all_to_cart %}

      <button type="button" class="wk-button-bulk-add-to-cart" title="{{ btn_title }}" data-wk-bulk-add-to-cart="{{ wishlist.permaId }}">
        <span class="wk-label">{{ btn_text }}</span>
      </button>
    `,
  },
  {
    id: "wishlist-button-clear",
    data: "wishlist",
    events: {
      "click button[data-wk-clear-wishlist]": (event) => {
        WishlistKing.toolkit.clear(
          event.currentTarget.getAttribute("data-wk-clear-wishlist")
        );
      },
    },
    template: `
      {% assign btn_text = locale.clear_wishlist %}
      {% assign btn_title = locale.clear_wishlist %}

      <button type="button" class="wk-button-wishlist-clear" title="{{ btn_title }}" data-wk-clear-wishlist="{{ wishlist.permaId }}">
        <span class="wk-label">{{ btn_text }}</span>
      </button>
    `,
  },
  {
    id: "wishlist-icon",
    template: `
    <svg width="14" alt="My favorites" class="icon-xsmall" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.6167 4.16171C15.5273 3.80254 15.3895 3.45801 15.207 3.13815C15.0318 2.80542 14.8078 2.50238 14.5428 2.2397C14.1586 1.84635 13.7037 1.53349 13.2032 1.3185C12.196 0.893832 11.0664 0.893832 10.0592 1.3185C9.58617 1.52417 9.15163 1.81279 8.77495 2.17147L8.71959 2.2397L8 2.97894L7.2804 2.2397L7.22505 2.17147C6.84837 1.81279 6.41382 1.52417 5.94084 1.3185C4.93358 0.893832 3.80402 0.893832 2.79675 1.3185C2.29634 1.53349 1.84138 1.84635 1.45719 2.2397C0.931736 2.76493 0.559768 3.43068 0.383333 4.16171C0.28947 4.53294 0.244784 4.91548 0.250484 5.29899C0.250484 5.65951 0.294767 6.01889 0.383333 6.36803C0.476143 6.72064 0.609955 7.06048 0.781879 7.38021C0.967552 7.7089 1.19462 8.01099 1.45719 8.27867L8 15L14.5428 8.27867C14.8052 8.01368 15.0299 7.71003 15.207 7.38021C15.5666 6.74914 15.754 6.0302 15.7495 5.29899C15.7553 4.91548 15.7106 4.53293 15.6167 4.16171V4.16171ZM14.5096 6.01548C14.377 6.53512 14.1135 7.00974 13.7457 7.39159L7.97786 13.3054L2.21 7.39159C2.02205 7.19713 1.85842 6.97937 1.72289 6.74334C1.59536 6.50983 1.49504 6.26171 1.42398 6.0041C1.36726 5.74653 1.33756 5.48345 1.33542 5.21938C1.33692 4.94775 1.36661 4.67707 1.42398 4.41191C1.49295 4.15356 1.59338 3.90519 1.72289 3.67268C1.85574 3.43385 2.01959 3.21776 2.21 3.02443C2.49441 2.73618 2.82852 2.50478 3.1953 2.34206C3.9344 2.03832 4.75891 2.03832 5.49801 2.34206C5.86335 2.49787 6.19325 2.72646 6.47224 3.01305L7.97786 4.57113L9.48347 3.01305C9.76226 2.72595 10.0933 2.49796 10.4577 2.34206C11.1968 2.03832 12.0213 2.03832 12.7604 2.34206C13.1269 2.50469 13.4612 2.73669 13.7457 3.02443C13.9383 3.21208 14.1 3.43044 14.2217 3.67268C14.4782 4.13721 14.6118 4.66261 14.6092 5.19663C14.6243 5.47143 14.6019 5.74703 14.5428 6.01548H14.5096V6.01548Z" fill="currentColor"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.2029 1.31848C13.7033 1.53347 14.1582 1.84633 14.5424 2.23968C14.8074 2.50236 15.0314 2.8054 15.2067 3.13813C15.3891 3.45799 15.5269 3.80252 15.6163 4.16169C15.7102 4.53291 15.7549 4.91546 15.7491 5.29897C15.7536 6.03018 15.5662 6.74912 15.2067 7.38019C15.0295 7.71001 14.8048 8.01366 14.5424 8.27865L7.99961 15L1.4568 8.27865C1.19422 8.01097 0.967162 7.70888 0.781488 7.38019C0.609565 7.06046 0.475752 6.72062 0.382942 6.36801C0.294376 6.01887 0.250093 5.65949 0.250093 5.29897C0.244393 4.91546 0.289079 4.53292 0.382942 4.16169C0.559378 3.43066 0.931345 2.76491 1.4568 2.23968C1.84099 1.84633 2.29595 1.53347 2.79636 1.31848C3.80363 0.893812 4.93319 0.893812 5.94045 1.31848C6.41343 1.52415 6.84798 1.81277 7.22466 2.17145L7.28001 2.23968L7.99961 2.97892L8.7192 2.23968L8.77456 2.17145C9.15124 1.81277 9.58578 1.52415 10.0588 1.31848C11.066 0.893812 12.1956 0.893812 13.2029 1.31848ZM8.60699 2.13991L8.66414 2.06946L8.67112 2.06281C9.06042 1.69212 9.5097 1.39366 9.99895 1.18093L10.0005 1.18026C11.045 0.739876 12.2166 0.739884 13.2611 1.18027L13.2621 1.18066C13.7803 1.40331 14.2513 1.72716 14.6489 2.134C14.9238 2.40675 15.1563 2.7211 15.3382 3.06602C15.5268 3.39717 15.6693 3.75368 15.7618 4.12519C15.8587 4.5086 15.9049 4.90364 15.8991 5.29966C15.9035 6.05586 15.7097 6.79956 15.3379 7.45283C15.1542 7.79451 14.9213 8.10906 14.6495 8.3837C14.6493 8.38386 14.6496 8.38354 14.6495 8.3837L7.99961 15.215L1.34972 8.38369C1.34964 8.38361 1.3498 8.38376 1.34972 8.38369C1.07801 8.10665 0.842903 7.79388 0.650886 7.45397L0.649348 7.45125C0.471805 7.12106 0.333686 6.77017 0.237883 6.40619L0.237541 6.4049C0.145967 6.04389 0.100185 5.6725 0.100093 5.30008C0.0943052 4.9041 0.140455 4.5091 0.237319 4.12571C0.420155 3.36879 0.805411 2.67894 1.35012 2.13423C1.74776 1.72728 2.2188 1.40335 2.73715 1.18066L2.73809 1.18026C3.78261 0.739881 4.9542 0.739884 5.99872 1.18027L6.00027 1.18092C6.48951 1.39365 6.93879 1.69212 7.32809 2.06281L7.33507 2.06946L7.39223 2.13992L7.99961 2.76387L8.60699 2.13991ZM1.7225 3.67266C1.59299 3.90517 1.49256 4.15354 1.42359 4.41189C1.36622 4.67705 1.33653 4.94773 1.33503 5.21936C1.33717 5.48343 1.36686 5.74651 1.42359 6.00408C1.49465 6.26169 1.59497 6.50981 1.7225 6.74332C1.85803 6.97935 2.02166 7.19711 2.20961 7.39157L7.97747 13.3054L13.7453 7.39157C14.1131 7.00972 14.3766 6.5351 14.5092 6.01546H14.5424C14.6015 5.74701 14.6239 5.47141 14.6088 5.19661C14.6114 4.66259 14.4778 4.13719 14.2214 3.67266C14.0996 3.43042 13.9379 3.21206 13.7453 3.02441C13.4608 2.73667 13.1265 2.50467 12.76 2.34204C12.0209 2.0383 11.1964 2.0383 10.4573 2.34204C10.0929 2.49794 9.76187 2.72593 9.48308 3.01303L7.97747 4.57111L6.47185 3.01303C6.19286 2.72644 5.86296 2.49785 5.49762 2.34204C4.75852 2.0383 3.93401 2.0383 3.19491 2.34204C2.82813 2.50476 2.49402 2.73616 2.20961 3.02441C2.0192 3.21774 1.85535 3.43383 1.7225 3.67266ZM3.25384 2.47999C2.90518 2.63497 2.58731 2.8552 2.31648 3.12966C2.13516 3.31377 1.97959 3.51905 1.85359 3.74557C1.73071 3.96618 1.6352 4.20193 1.56944 4.44713C1.51483 4.70066 1.48653 4.95945 1.48503 5.21916C1.48715 5.47115 1.51538 5.72217 1.56924 5.96798C1.63703 6.21263 1.7324 6.44824 1.85338 6.67002C1.98257 6.89475 2.1384 7.10202 2.31723 7.28708C2.31731 7.28716 2.31716 7.287 2.31723 7.28708L7.97747 13.0906L13.6373 7.2875C13.6374 7.28739 13.6372 7.28761 13.6373 7.2875C13.9867 6.92465 14.2376 6.47299 14.3639 5.97837L14.5092 6.01546V6.00814L14.3959 5.98319C14.4521 5.72804 14.4734 5.46605 14.4591 5.20482L14.4586 5.1959C14.461 4.6873 14.334 4.18713 14.09 3.74515L14.0872 3.74008C13.9732 3.51313 13.8217 3.30819 13.6406 3.13185L13.6386 3.12989C13.3675 2.85574 13.0494 2.63485 12.7011 2.47999C11.9993 2.19219 11.217 2.19231 10.5153 2.48037C10.1698 2.62835 9.85565 2.84471 9.59084 3.11738C9.59079 3.11743 9.59089 3.11733 9.59084 3.11738L7.97747 4.78697L6.36436 3.11766C6.36431 3.11761 6.36441 3.11771 6.36436 3.11766C6.09908 2.84519 5.78581 2.62816 5.4397 2.48041C4.738 2.19231 3.95562 2.19217 3.25384 2.47999Z" fill="currentColor"></path>
</svg>
    `,
  },
  {
    id: "remove-icon",
    template: `
      <svg class="wk-icon__svg" width="100%" height="100%" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <path vector-effect="non-scaling-stroke" d="M0.309,0.309a0.9,0.9,0,0,1,1.268,0L63.691,62.423a0.9,0.9,0,0,1-1.268,1.268L0.309,1.577A0.9,0.9,0,0,1,.309.309Z"/>
        <path vector-effect="non-scaling-stroke" d="M63.691,0.309a0.9,0.9,0,0,1,0,1.268L1.577,63.691A0.9,0.9,0,0,1,.309,62.423L62.423,0.309A0.9,0.9,0,0,1,63.691.309Z"/>
      </svg>
    `,
  },
  {
    id: "wishlist-share-button-fb",
    data: "wishlist",
    template: `
    <a href="#" class="favorites_social-icon w-inline-block" title="{{ locale.share_on_facebook }}" data-wk-share-service="facebook" data-wk-share="{{ wishlist.permaId }}"><img loading="lazy"
    src="https://cdn.shopify.com/s/files/1/0663/1637/0155/t/8/assets/fb.png?v=1664137375" alt="Share on Facebook"></a>
    `,
  },
  {
    id: "wishlist-share-button-twitter",
    data: "wishlist",
    template: `
    <a href="#" class="favorites_social-icon w-inline-block" title="{{ locale.share_on_twitter }}" data-wk-share-service="twitter" data-wk-share="{{ wishlist.permaId }}"><img loading="lazy"
    src="https://cdn.shopify.com/s/files/1/0663/1637/0155/t/8/assets/twitter.png?v=1664167652" alt="Share on Twitter"></a>
    `,
  },
  {
    id: "wishlist-share-button-email",
    data: "wishlist",
    template: `
    <a href="mailto:?subject=My%20Eyeswoon%20Favorites&amp;body=https://www.eye-swoon.com/pages/shared-favorites/{{ wishlist.permaId }}" class="favorites_social-icon w-inline-block"><img loading="lazy"
    src="https://cdn.shopify.com/s/files/1/0663/1637/0155/t/8/assets/mail.png?v=1664137376" alt="Send email"></a>
    `,
  },
  {
    id: "wishlist-share-button-link",
    data: "wishlist",
    template: `
      <a onclick="alert('A link to your shareable list has been copied to your clipboard');var copyText = $(this).attr('data-text');var textarea = document.createElement('textarea');textarea.textContent = copyText;textarea.style.position = 'fixed';document.body.appendChild(textarea);textarea.select();document.execCommand('copy');document.body.removeChild(textarea);" href="#" class="favorites_social-icon w-inline-block wk-share-button copy-paste" title="{{ locale.get_link }}" data-wk-share-service="link" data-wk-share="{{ wishlist.permaId }}" data-text="eye-swoon.com/pages/shared-favorites/{{ wishlist.permaId }}" data-wk-share="{{ wishlist.permaId }}" style="background-image:url('https://cdn.shopify.com/s/files/1/0663/1637/0155/t/8/assets/link.png?v=1664167650');background-position: 50% 50%;background-size: 100% 100%;">
      </a>
    `,
  }
];

export default templates;
