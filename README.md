# Tayyeb Portfolio

A static, responsive professional portfolio for Tayyeb Iqbal.

## Foundation

- Semantic HTML5
- Custom CSS visual system
- Vanilla JavaScript
- No build step
- No backend contact form
- No external runtime libraries

The design uses a charcoal and deep-navy base, forest-green primary accents, and restrained gold highlights. Typography uses Inter throughout, with bold uppercase display headings to match the Jawad reference more closely.

## Interactions

- Responsive one-page navigation with active-section highlighting
- Smooth scrolling and scroll progress indicator
- Staggered section and card reveals
- Pointer-position lighting and hover motion on cards and rows
- Reduced-motion support

## Run locally

Open `index.html` directly in a browser or serve the folder with any static web server.

## Deploy with GitHub Actions

The workflow in `.github/workflows/deploy.yml` deploys the static portfolio over SSH to `/var/www/html/tayyab-portfolio` on `3.129.34.163` as `ubuntu` whenever changes are pushed to `main`. It can also be started manually from the repository's Actions tab.

Configure this repository **Actions secret** before the first deployment:

- `SSH_PRIVATE_KEY`: the private SSH key whose public key is authorized for the `ubuntu` account on the server.

The workflow retrieves the SSH host key for `3.129.34.163` with `ssh-keyscan` and then requires strict host-key checking for SSH and rsync. For stronger protection against a man-in-the-middle attack during first contact, pin a host-key fingerprint verified through a trusted channel instead of relying on runtime discovery.

The `ubuntu` account must be able to write to the deployment directory. If needed, prepare the directory on the server once:

```sh
sudo mkdir -p /var/www/html/tayyab-portfolio
sudo chown ubuntu:ubuntu /var/www/html/tayyab-portfolio
```

The workflow mirrors the repository into the deployment directory, removing files there that are no longer present in the repository. Keep unrelated files out of that directory.

## Replaceable placeholders

The following assets are intentionally not included yet:

- Project screenshots: `assets/img/projects/`
- Resume PDF: `assets/img/cv/master-resume.pdf`
- Logo and favicon: `assets/img/logo/`
- Custom icons: `assets/img/icons/`

The approved profile photo is used from `assets/img/profile/profile-photo.png`. Project image placeholders in `index.html` are marked with `PLACEHOLDER` comments until screenshots are supplied.

-----------------