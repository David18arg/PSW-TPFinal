<?php

namespace EmpresaBundle\Controller;

use EmpresaBundle\Entity\Usuario;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

/*AGREGADOs*/
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
/*AGREGADOs*/

/**
 * Usuario controller.
 *
 * @Route("usuario")
 */
class UsuarioController extends Controller
{
    /**
     * Lists all usuario entities.
     *
     * @Route("/", name="usuario_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $usuarios = $em->getRepository('EmpresaBundle:Usuario')->findAll();
        $response = new Response();
        $encoders = array(new JsonEncoder());
        $normalizers = array(new ObjectNormalizer());
        $serializer = new Serializer($normalizers, $encoders);
        $response->setContent(json_encode(array(
            'usuarios' => $serializer->serialize($usuarios, 'json'),
        )));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
  
       
       /* $em = $this->getDoctrine()->getManager();

        $usuarios = $em->getRepository('EmpresaBundle:Usuario')->findAll();

        return $this->render('usuario/index.html.twig', array(
            'usuarios' => $usuarios,
        ));*/
    }

    /**
     * Creates a new usuario entity.
     *
     * @Route("/new", name="usuario_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $request->request->replace($data);
        //creamos un usuario
        $usuario = new Usuario();
        $usuario->setApellido($request->request->get('apellido'));
        $usuario->setNombres($request->request->get('nombres'));
        $usuario->setDni($request->request->get('dni'));
        $usuario->setEmail($request->request->get('email'));
        $usuario->setTelefono($request->request->get('telefono'));
        $usuario->setUsuario($request->request->get('usuario'));
        $usuario->setPassword($request->request->get('password'));
        $usuario->setPerfil($request->request->get('perfil'));
        //guardamos en la bd
        $em = $this->getDoctrine()->getManager();
        $em->persist($usuario); $em->flush();
        $result['status'] = 'ok';
        return new Response(json_encode($result), 200);
        /*$usuario = new Usuario();
        $form = $this->createForm('EmpresaBundle\Form\UsuarioType', $usuario);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($usuario);
            $em->flush();

            return $this->redirectToRoute('usuario_show', array('id' => $usuario->getId()));
        }

        return $this->render('usuario/new.html.twig', array(
            'usuario' => $usuario,
            'form' => $form->createView(),
        ));*/
    }

    /**
     * Finds and displays a usuario entity.
     *
     * @Route("/{id}", name="usuario_show")
     * @Method("GET")
     */
    public function showAction(Usuario $usuario)
    {
        $deleteForm = $this->createDeleteForm($usuario);

        return $this->render('usuario/show.html.twig', array(
            'usuario' => $usuario,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing usuario entity.
     *
     * @Route("/{id}/edit", name="usuario_edit")
     * @Method({"GET", "POST"})
     */
    public function editAction($id, Request $request)
    {

        $data = json_decode($request->getContent(), true);
        $request->request->replace($data);

        $em = $this->getDoctrine()->getManager();
        $usuario = $em->getRepository('EmpresaBundle:Usuario')->find($id);

        $usuario->setApellido($request->request->get('apellido'));
        $usuario->setNombres($request->request->get('nombres'));
        $usuario->setDni($request->request->get('dni'));
        $usuario->setEmail($request->request->get('email'));
        $usuario->setTelefono($request->request->get('telefono'));
        $usuario->setUsuario($request->request->get('usuario'));
        $usuario->setPassword($request->request->get('password'));
        $usuario->setPerfil($request->request->get('perfil'));

       
        //confecciono una entidad empresa para asignar a mensaje
        /*$empresaArray= $request->request->get('empresa');
        $idEmpresa = $empresaArray['id'];

        $empresa = $em->getRepository("MensajeBundle:Empresa")->find($idEmpresa);
        $usuario->setEmpresa($empresa);*/

        $em->persist($usuario);
        $em->flush();
        $result['status'] = 'ok';
        return new Response(json_encode($result), 200);
    }

    /*public function editAction(Request $request, Usuario $usuario)
    {
        $deleteForm = $this->createDeleteForm($usuario);
        $editForm = $this->createForm('EmpresaBundle\Form\UsuarioType', $usuario);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('usuario_edit', array('id' => $usuario->getId()));
        }

        return $this->render('usuario/edit.html.twig', array(
            'usuario' => $usuario,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }*/

    /**
     * Deletes a usuario entity.
     *
     * @Route("/delete/{id}", name="usuario_delete")
     * @Method("DELETE")
     */
    public function deleteAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $usuario = $em->getRepository('EmpresaBundle:Usuario')->find($id);
        if (!$usuario){
            throw $this->createNotFoundException('id incorrecta');
        }
        $em->remove($usuario);
        $em->flush();
        $result['status'] = 'ok';
        return new Response(json_encode($result), 200);
    }

    /*public function deleteAction(Request $request, Usuario $usuario)
    {
        $form = $this->createDeleteForm($usuario);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($usuario);
            $em->flush();
        }

        return $this->redirectToRoute('usuario_index');
    }*/

    /**
     * Creates a form to delete a usuario entity.
     *
     * @param Usuario $usuario The usuario entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Usuario $usuario)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('usuario_delete', array('id' => $usuario->getId())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}
