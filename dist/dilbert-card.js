class DILBERTcard extends HTMLElement {
    config;
    content;
    lastFetchDate = null;

    setConfig(config) {
        this.config = config;
    }
//let's try an async fetch of data to try to crush this flicker bug
    async fetchData() {
        try {
            const response = await fetch('/local/community/dilbert-card-ha/dilbert_data.json', { cache: 'no-cache' });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch Dilbert data:', error);
            return null;
        }
    }

    getImageUrl() {
        const currentDate = new Date().getDate();
        return `/local/community/dilbert-card-ha/dilbert.png?_ts=${currentDate}`;
    }

    async updateContent() {
        const currentDate = new Date().getDate();

        // Only update if the date has changed or it's the first run
        if (this.lastFetchDate !== currentDate) {
            this.lastFetchDate = currentDate;
            
            const data = await this.fetchData();
            const imageUrl = this.getImageUrl();

            if (!this.content.querySelector('.image-container')) {
                this.content.innerHTML = `
                    <style>
                        .image-container {
                            position: relative;
                            width: 100%;
                        }
                        .dilbert-image {
                            width: 100%;
                            display: block;
                        }
                        .title-text {
                            padding: 8px;
                            text-align: center;
                            font-size: 0.9em;
                            color: var(--primary-text-color);
                        }
                    </style>
                    <div class="image-container">
                        <img class="dilbert-image" src="${imageUrl}" alt="Dilbert">
                        ${data?.title ? `<div class="title-text">${data.title}</div>` : ''}
                    </div>
                `;
            } else {
                const img = this.content.querySelector('.dilbert-image');
                if (img && img.src !== imageUrl) {
                    img.src = imageUrl;
                }
                
                if (data?.title) {
                    let titleDiv = this.content.querySelector('.title-text');
                    if (titleDiv) {
                        titleDiv.textContent = data.title;
                    }
                }
            }
        }
    }

    set hass(hass) {
        if (!this.content) {
            this.innerHTML = `
                <ha-card>
                    <div id="content"></div>
                </ha-card>`;
            this.content = this.querySelector('#content');
        }

        this.updateContent().catch(error => 
            console.error('Failed to update Dilbert card:', error)
        );
    }

    getCardSize() {
        return 3;
    }
}

if (!customElements.get('dilbert-card')) {
    customElements.define('dilbert-card', DILBERTcard);
} else
{
customElements.define('dilbert-card', DILBERTcard);
};


window.customCards = window.customCards || [];
window.customCards.push({
    type: "dilbert-card",
    name: "Dilbert",
    description: "Your daily Dilbert comic"
});