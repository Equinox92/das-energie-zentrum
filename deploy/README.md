# Das Energie Zentrum - Deployment Package

This folder contains the deployable version of the Das Energie Zentrum website.

## Purpose

The deploy folder is the only folder that should be uploaded to production hosting environments such as:

- STRATO
- Azure App Service
- IIS
- Apache
- Nginx

## This folder contains

- HTML
- CSS
- JavaScript
- Images
- Fonts
- Icons
- Deployment configuration

## This folder never contains

- Backend source code
- Documentation
- Git metadata
- Visual Studio files
- Scripts used during development
- Test assets

## Deployment Philosophy

Development Repository

↓

Deployment Builder

↓

Deploy Folder

↓

Production Server

This separation reduces deployment errors, improves security, and creates a repeatable deployment process.

Future automation will generate this folder automatically.